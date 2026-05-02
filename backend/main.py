from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
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
async def get_jobs():
    result = supabase.table("jobs").select("*").execute()
    return result.data


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