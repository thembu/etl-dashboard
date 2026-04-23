export default function MetricCards({ totalJobs, topSkill, avgSalary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Total Jobs</p>
        <p className="text-4xl font-black text-amber-400">{totalJobs}</p>
        <p className="text-xs text-zinc-500 mt-1">across all provinces</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Top Skill</p>
        <p className="text-4xl font-black text-amber-400">{topSkill?.skill}</p>
        <p className="text-xs text-zinc-500 mt-1">{topSkill?.job_count} job listings</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Avg Max Salary</p>
        <p className="text-4xl font-black text-amber-400">R{(avgSalary / 1000).toFixed(0)}k</p>
        <p className="text-xs text-zinc-500 mt-1">per month</p>
      </div>
    </div>
  )
}