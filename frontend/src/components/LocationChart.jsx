import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LocationChart({ locations }) {
  const ref = useRef()

  useEffect(() => {
    if (!locations?.length) return

    const width = ref.current.offsetWidth
    const height = 260
    const radius = Math.min(width, height) / 2 - 20

    d3.select(ref.current).selectAll('*').remove()

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2.5},${height / 2})`)

    const color = d3.scaleOrdinal()
      .domain(locations.map(d => d.province))
      .range(['#f59e0b', '#3b82f6', '#10b981', '#71717a', '#ef4444'])

    const pie = d3.pie().value(d => d.job_count).sort(null)
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius)

    const arcs = svg.selectAll('arc')
      .data(pie(locations))
      .join('g')

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.province))
      .attr('stroke', '#18181b')
      .attr('stroke-width', 2)
      .transition()
      .duration(600)
      .attrTween('d', function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return t => arc(i(t))
      })

    // Legend
    const legend = d3.select(ref.current).select('svg')
      .append('g')
      .attr('transform', `translate(${width / 2 + 20}, ${height / 2 - locations.length * 12})`)

    locations.sort((a, b) => b.job_count - a.job_count).forEach((d, i) => {
      const g = legend.append('g').attr('transform', `translate(0, ${i * 24})`)
      g.append('rect').attr('width', 10).attr('height', 10).attr('fill', color(d.province)).attr('rx', 2)
      g.append('text').attr('x', 14).attr('y', 9).style('fill', '#a1a1aa').style('font-size', '11px').text(`${d.province} (${d.job_count})`)
    })

  }, [locations])

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Jobs by Province</p>
      <div ref={ref} className="w-full" />
    </div>
  )
}