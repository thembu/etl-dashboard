import { useState, useEffect } from 'react'
import axios from 'axios'
import MetricCards from '../components/MetricCards'
import SkillDemandChart from '../components/SkillDemandChart'
import SalaryChart from '../components/SalaryChart'
import LocationChart from '../components/LocationChart'

const API = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const [skills, setSkills] = useState([])
  const [salaries, setSalaries] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  

  useEffect(() => {
    console.log('API URL:', API)
    Promise.all([
  axios.get(`${API}/api/dashboard/skills`),
  axios.get(`${API}/api/dashboard/salaries`),
  axios.get(`${API}/api/dashboard/locations`)
]).then(([skillsRes, salariesRes, locationsRes]) => {
  console.log('skills:', skillsRes.data)
  console.log('salaries:', salariesRes.data)
  console.log('locations:', locationsRes.data)
  setSkills(skillsRes.data.data)
  setSalaries(salariesRes.data.data)
  setLocations(locationsRes.data.data)
}).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading dashboard...</p>
    </div>
  )
const totalJobs = locations?.reduce((sum, l) => sum + l.job_count, 0) ?? 0
const topSkill = skills?.length ? skills.reduce((a, b) => a.job_count > b.job_count ? a : b) : null
const avgSalary = salaries?.length ? Math.round(salaries.reduce((sum, s) => sum + s.avg_max, 0) / salaries.length) : 0

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center">
            <span className="text-black font-black text-xs">SA</span>
          </div>
          <span className="font-bold text-white tracking-tight">DevPulse — Market Dashboard</span>
        </div>
        <span className="text-xs text-zinc-500 border border-zinc-800 bg-zinc-900 px-3 py-1 rounded-full">
          Part of DevPulse ZA
        </span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <MetricCards totalJobs={totalJobs} topSkill={topSkill} avgSalary={avgSalary} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SkillDemandChart skills={skills} />
          <LocationChart locations={locations} />
        </div>
        <SalaryChart salaries={salaries} />
      </div>
    </div>
  )
}