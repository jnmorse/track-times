import {
  select,
  scaleTime,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  curveMonotoneX
} from 'd3'

import data from './results.json'

const [mens, womens] = data.filter(({ gender, name }) => {
  if (gender === 'M' || gender === 'W') {
    if (name.match(/100M (Men|Women)/u)) {
      return true
    }
  }

  return false
})

function sortDate(a, b) {
  if (a.year < b.year) {
    return-1
  } else if (a.year > b.year) {
    return 1
  }

  return 0
}

const mensGames = mens.games.sort(sortDate).reduce((acc, game) => {
  if (game.year < 1928) {
    return acc
  }

  return[...acc, { ...game, year: new Date(`${game.year}-01-01T00:00:00`) }]
}, [])

const womensGames = womens.games.sort(sortDate).map(game => ({ ...game, year: new Date(`${game.year}-01-01T00:00:00`) }))

const mensColor = 'blue'
const womensColor = 'pink'

const xScale = scaleTime()
  .domain([new Date(1928, 0, 0), new Date(2016, 0, 0)])
  .range([80, 1260])

const yScale = scaleLinear()
  .domain([
    9,
    13
  ])
  .range([700, 20])
yScale.ticks(20)

const svg = select('#chart')
  .append('svg')
  .attr('width', 1280)
  .attr('height', 720)
  .attr('viewBox', '0,0,1280,720')

svg.append('g')
  .attr('transform', 'translate(0, 700)')
  .call(axisBottom(xScale))

svg.append('g')
  .attr('transform', 'translate(70, 0)')
  .call(axisLeft(yScale))

const mensLine = line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.results[0].result))
  .curve(curveMonotoneX)

svg.append('path')
  .datum(mensGames)
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('stroke', 'blue')
  .attr('d', mensLine)

const womensLine = line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.results[0].result))
  .curve(curveMonotoneX)

svg.append('path')
  .datum(womensGames)
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('stroke', 'pink')
  .attr('d', womensLine)

svg.append('g').attr('class', 'mens').selectAll('.men')
  .data(mensGames)
  .enter()
  .append('circle')
  .attr('class', 'men')
  .attr('r', 5)
  .attr('cx', d => Math.floor(xScale(d.year)))
  .attr('cy', d => yScale(d.results[0].result))
  .attr('fill', mensColor)

svg.append('g').attr('class', 'womens').selectAll('.women')
  .data(womensGames)
  .enter()
  .append('circle')
  .attr('class', 'woman')
  .attr('r', 5)
  .attr('cx', d => Math.floor(xScale(d.year)))
  .attr('cy', d => yScale(d.results[0].result))
  .attr('fill', womensColor)
