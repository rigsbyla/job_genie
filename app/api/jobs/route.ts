import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const discipline = searchParams.get('discipline')
  const level = searchParams.get('level')
  const type = searchParams.get('type')

  let query = supabase
    .from('jobs')
    .select(`
      *,
      job_skills (
        skills ( name )
      )
    `)

  if (discipline) query = query.eq('discipline', discipline)
  if (level) query = query.eq('level', level)
  if (type) query = query.eq('type', type)

  const { data, error } = await query

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const formatted = data.map(job => ({
    ...job,
    skills: job.job_skills.map(js => js.skills.name)
  }))

  return Response.json(formatted)
}