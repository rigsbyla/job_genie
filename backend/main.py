from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from collections import defaultdict
import os

load_dotenv()
app = FastAPI()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

# Prevent crashing if Supabase keys missing
if not url or not key:
    raise ValueError("Missing Supabase environment variables")

# Initialize Supabase client
supabase: Client = create_client(url, key)

# CORS lets your Next.js frontend talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoint to fetch jobs with optional filters for discipline, level, and type
@app.get("/jobs")
async def get_jobs(
    discipline: str = Query(None),
    level: str = Query(None),
    type: str = Query(None),
):
    query = supabase.table("jobs").select("*, job_skills(skills(name))")

    if discipline:
        query = query.eq("discipline", discipline)
    if level:
        query = query.eq("level", level)
    if type:
        query = query.eq("type", type)

    query = query.order("created_at", desc=True)
    result = query.execute()

    formatted = [
        {
            **job,
            "skills": [
                js["skills"]["name"]
                for js in job.get("job_skills", []) or []
                if js.get("skills") and js["skills"].get("name")
            ],
        }
        for job in result.data or []
    ]

    return formatted


# Endpoint to fetch a single job by ID, including its skills
@app.get("/jobs/{job_id}")
async def get_job(job_id: int):
    result = (
        supabase.table("jobs")
        .select("*, job_skills(skills(name))")
        .eq("id", job_id)
        .single()
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Job not found")

    job = result.data
    job["skills"] = [js["skills"]["name"] for js in job["job_skills"]]

    return job


# Not currently used, but will allow to fetch trends for graph creation in the future
# Endpoint to fetch trends for skills, remote work, and disciplines over time
@app.get("/trends/skills")
async def skill_trends():
    result = (
        supabase.table("job_snapshots")
        .select("skill, snapshot_at")
        .order("snapshot_at")
        .execute()
    )

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        trend = row["skill"]
        month = row["snapshot_at"][:7]
        counts[trend][month] += 1

    return {
        skill: dict(sorted(months.items())) for skill, months in counts.items()
    }


# Endpoint for remote work
@app.get("/trends/remote")
async def remote_trends():
    result = (
        supabase.table("job_snapshots")
        .select("remote, snapshot_at")
        .order("snapshot_at")
        .execute()
    )

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        month = row["snapshot_at"][:7]
        counts[row["remote"]][month] += 1

    return {
        remote: dict(sorted(months.items()))
        for remote, months in counts.items()
    }


# Endpoint for disciplines
@app.get("/trends/discipline")
async def discipline_trends():
    result = (
        supabase.table("job_snapshots")
        .select("discipline, snapshot_at")
        .order("snapshot_at")
        .execute()
    )

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        month = row["snapshot_at"][:7]
        counts[row["discipline"]][month] += 1

    return {
        discipline: dict(sorted(months.items()))
        for discipline, months in counts.items()
    }
