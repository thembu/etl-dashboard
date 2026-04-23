import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SkillDemandChart({ skills }) {
  const ref = useRef()

  useEffect(() => {
    if (!skills?.length) return

    const top = [...skills]
      .sort((a, b) => b.job_count - a.job_count)
      .slice(0, 10)

    const margin = { top: 10, right: 40, bottom: 10, left: 80 }
    const width = ref.current.offsetWidth - margin.left - margin.right
    const height = top.length * 36

    d3.select(ref.current).selectAll('*').remove()

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear()
      .domain([0, d3.max(top, d => d.job_count)])
      .range([0, width])

    const y = d3.scaleBand()
      .domain(top.map(d => d.skill))
      .range([0, height])
      .padding(0.3)

    // Y axis
    svg.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .style('fill', '#a1a1aa')
      .style('font-size', '12px')

    // Bars
    svg.selectAll('.bar')
      .data(top)
      .join('rect')
      .attr('class', 'bar')
      .attr('y', d => y(d.skill))
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', '#f59e0b')
      .attr('rx', 4)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('width', d => x(d.job_count))

    // Value labels
    svg.selectAll('.label')
      .data(top)
      .join('text')
      .attr('class', 'label')
      .attr('y', d => y(d.skill) + y.bandwidth() / 2 + 4)
      .attr('x', d => x(d.job_count) + 6)
      .style('fill', '#71717a')
      .style('font-size', '11px')
      .text(d => d.job_count)

  }, [skills])

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Top Skills in Demand</p>
      <div ref={ref} className="w-full" />
    </div>
  )
}