import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SalaryChart({ salaries }) {
  const ref = useRef()

  useEffect(() => {
    if (!salaries?.length) return

    const top = [...salaries]
      .sort((a, b) => b.avg_max - a.avg_max)
      .slice(0, 10)

    const margin = { top: 10, right: 60, bottom: 40, left: 80 }
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
      .domain([0, d3.max(top, d => d.avg_max)])
      .range([0, width])

    const y = d3.scaleBand()
      .domain(top.map(d => d.skill))
      .range([0, height])
      .padding(0.3)

    const subY = d3.scaleBand()
      .domain(['avg_min', 'avg_max'])
      .range([0, y.bandwidth()])
      .padding(0.1)

    // Y axis
    svg.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .style('fill', '#a1a1aa')
      .style('font-size', '12px')

    // Min bars
    svg.selectAll('.bar-min')
      .data(top)
      .join('rect')
      .attr('class', 'bar-min')
      .attr('y', d => y(d.skill) + subY('avg_min'))
      .attr('height', subY.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', '#3b82f6')
      .attr('rx', 4)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('width', d => x(d.avg_min))

    // Max bars
    svg.selectAll('.bar-max')
      .data(top)
      .join('rect')
      .attr('class', 'bar-max')
      .attr('y', d => y(d.skill) + subY('avg_max'))
      .attr('height', subY.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', '#10b981')
      .attr('rx', 4)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('width', d => x(d.avg_max))

    // Value labels
    svg.selectAll('.label-max')
      .data(top)
      .join('text')
      .attr('class', 'label-max')
      .attr('y', d => y(d.skill) + subY('avg_max') + subY.bandwidth() / 2 + 4)
      .attr('x', d => x(d.avg_max) + 6)
      .style('fill', '#71717a')
      .style('font-size', '11px')
      .text(d => `R${Math.round(d.avg_max / 1000)}k`)

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(0, ${height + 20})`)

    legend.append('rect').attr('width', 10).attr('height', 10).attr('fill', '#3b82f6').attr('rx', 2)
    legend.append('text').attr('x', 14).attr('y', 9).style('fill', '#71717a').style('font-size', '11px').text('Avg Min')

    legend.append('rect').attr('x', 80).attr('width', 10).attr('height', 10).attr('fill', '#10b981').attr('rx', 2)
    legend.append('text').attr('x', 94).attr('y', 9).style('fill', '#71717a').style('font-size', '11px').text('Avg Max')

  }, [salaries])

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Avg Salary by Skill (R/month)</p>
      <div ref={ref} className="w-full" />
    </div>
  )
}