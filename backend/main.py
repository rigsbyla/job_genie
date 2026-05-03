from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from collections import defaultdict
import os

load_dotenv()

supabase: Client = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_KEY"]
)

print("Connecting to:", os.environ["SUPABASE_URL"])

app = FastAPI()

# CORS lets your Next.js frontend talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_KEY"]
)

@app.get("/jobs")
async def get_jobs(
    discipline: str = Query(None),
    level: str = Query(None),
    type: str = Query(None)
):
    query = supabase.table("jobs").select("*, job_skills(skills(name))")

    if discipline:
        query = query.eq("discipline", discipline)
    if level:
        query = query.eq("level", level)
    if type:
        query = query.eq("type", type)

    result = query.execute()

    formatted = [
        {**job, "skills": [js["skills"]["name"] for js in job["job_skills"]]}
        for job in result.data
    ]

    return formatted


@app.get("/jobs/{job_id}")
async def get_job(job_id: int):
    result = supabase.table("jobs") \
        .select("*, job_skills(skills(name))") \
        .eq("id", job_id) \
        .single() \
        .execute()

    if not result.data:
        return {"error": "Job not found"}, 404

    job = result.data
    job["skills"] = [js["skills"]["name"] for js in job["job_skills"]]

    return job

@app.get("/trends/skills")
async def skill_trends():
    result = supabase.table("job_snapshots") \
        .select("skill, snapshot_at") \
        .order("snapshot_at") \
        .execute()

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        trend = row["skill"]
        month = row["snapshot_at"][:7]
        counts[trend][month] += 1

    return {skill: dict(sorted(months.items())) for skill, months in counts.items()}


@app.get("/trends/remote")
async def remote_trends():
    result = supabase.table("job_snapshots") \
        .select("remote, snapshot_at") \
        .order("snapshot_at") \
        .execute()

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        month = row["snapshot_at"][:7]
        counts[row["remote"]][month] += 1

    return {remote: dict(sorted(months.items())) for remote, months in counts.items()}


@app.get("/trends/discipline")
async def discipline_trends():
    result = supabase.table("job_snapshots") \
        .select("discipline, snapshot_at") \
        .order("snapshot_at") \
        .execute()

    counts = defaultdict(lambda: defaultdict(int))
    for row in result.data:
        month = row["snapshot_at"][:7]
        counts[row["discipline"]][month] += 1

    return {
        discipline: dict(sorted(months.items()))
        for discipline, months in counts.items()
    }