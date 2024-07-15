import * as d3 from "d3"
import { useEffect, useRef } from "react"
import useViewport from '../../utils/useViewport'
import PropTypes from 'prop-types'

/**
 * A Bar chart showing the user weight and calories burned. Filled by D3.js.
 * @name BarChart
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @param {number} props.svgHeight - height of svg container
 * @returns {ReactElement} a Bar Chart
 * @component
 */
export default function BarChart({data, svgHeight}) {
	//svg parent ref
	const chartContainerRef = useRef()
	//ref for resize event
	const updateBars = useRef(false)
	//responsive width
	const { viewportWidth } = useViewport()

	useEffect(() => {
		
		//if resize remove the previous chart
		updateBars.current ? d3.select('.barChart-svg').remove() : updateBars.current = true
		// re-draw the chart with new dimensions after resize 
		DrawChart(data)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, viewportWidth])

	const margin = {top: 50, left: 50, right: 20, bottom: 20}
	
	const DrawChart = (data) => {

		//dimentions
		const graphWidth = parseInt(d3.select(chartContainerRef.current).style('width')) - margin.left - margin.right
		const graphHeight = parseInt(d3.select(chartContainerRef.current).style('height')) - margin.top - margin.bottom
				
		// create new chart
		const svg = d3.select(chartContainerRef.current)
			.append('svg')
			.classed('barChart-svg', true)
			.attr('width', graphWidth + margin.left + margin.right)
			.attr('height', svgHeight)
			.style('background-color', '#F5F7F9')
			.style('border-radius', '5px')

		// chart title
		svg.append('text')
			.attr("x", margin.right)
			.attr("y", 30)
			.text('Activité quotidienne')
			.style("font-weight", "500")

		// X axis
		const extent = d3.extent(data.map(d => d.day))
		const x_Scale = d3.scaleLinear()
			.domain(extent)
			.range([margin.left, graphWidth - margin.right])

		const x_Axis = d3.axisBottom(x_Scale)
			.tickSize(0)
			.tickPadding(margin.bottom)
			.ticks(7)

		svg.append('g')
			.call(x_Axis)
			.attr('transform', `translate(0, ${svgHeight - margin.top})`)
			.attr("font-size", "1rem")
			.select('path')
			.attr('transform', 'scale(1.03) translate(-11,0)')

		// Y axis
		const max_weight = d3.max(data, d => d.kilogram)
		const max_calories = d3.max(data, d => d.calories)

		const y_Weight_Scale = d3.scaleLinear()
			.domain([max_weight-12, max_weight+3])
			.range([svgHeight - margin.top, margin.bottom])
			
		const y_Calories_Scale = d3.scaleLinear()
			.domain([0, max_calories])
			.range([0, svgHeight / 2])

		const y_Axis = d3.axisRight(y_Weight_Scale)
			.ticks(3)
			.tickSize(0)
			.tickPadding(20)
			
		svg.append('g')
			.call(y_Axis)
			.attr('transform', `translate(${graphWidth + margin.right}, 0)`)
			.attr("font-size", "1rem")
			.select('.domain').remove()

		//grille
		const gridTickValues = y_Axis.scale().ticks(3).slice(1)
		const yAxisGrid = d3.axisLeft(y_Weight_Scale)
			.tickSize(graphWidth - margin.right -margin.left)
			.tickFormat('')
			.tickValues(gridTickValues)
		svg.append('g')
			.style("stroke-dasharray", ("3, 3"))
			.style('color', 'lightgray')
			.attr('transform', `translate(${graphWidth - margin.right}, 0)`)
			.call(yAxisGrid)
			.select('path').remove()

		//legend
		const legend = svg.append('g')
		//weight legend
		legend.append('circle')
			.attr('cx', graphWidth - 190)
			.attr('cy', viewportWidth > 700 ? margin.bottom + 5 : 50)
			.attr('r', 4)
			.attr('fill','black')
		legend.append('text')
			.text('Poids (kg)')
			.attr("dx", graphWidth - 180)
			.attr('dy', viewportWidth > 700 ? margin.bottom + 5 : 50)
			.attr('fill', '#74798C')
			.style('font-size', '14px')
		//calories legend		
		legend.append('circle')
			.attr('cx', graphWidth - 100)
			.attr('cy', viewportWidth > 700 ? margin.bottom + 5 : 50)
			.attr('r', 4)
			.attr('fill','#E60000')
		legend.append('text')
		.text('Calories brûlées (kCal)')
		.attr("dx", graphWidth - 90)
		.attr('dy', viewportWidth > 700 ? margin.bottom + 5 : 50)
		.attr('fill', '#74798C')
		.style('font-size', '14px')

		//data			
		//rounded weight line 
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(d.day) - 7) // 7px offset to the right from the calorie line
			.attr('x2', d => x_Scale(d.day) - 7)
			.attr('y1', d => graphHeight + margin.bottom - 5)
			.attr('y2', d =>  graphHeight + margin.bottom - 5)
			.attr( 'stroke', "black")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"round")
			.transition()
			.duration(700)
			.attr('y2', d => y_Weight_Scale(d.kilogram) + 3)

		// rect weight line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(d.day) - 7)
			.attr('x2', d => x_Scale(d.day) - 7)
			.attr('y1', d => graphHeight + margin.bottom)
			.attr('y2', d => graphHeight + margin.bottom)
			.transition()
			.duration(700)
			.attr('y2', d => y_Weight_Scale(d.kilogram)+3)
			.attr( 'stroke', "black")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"butt")
		//rounded calories line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(d.day) + 7)
			.attr('x2', d => x_Scale(d.day) + 7)
			.attr('y1', d => graphHeight + margin.bottom - 5)
			.attr('y2', d => graphHeight + margin.bottom - 5)
			.transition()
			.duration(700)
			.attr('y2', d => graphHeight - y_Calories_Scale(d.calories))
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"round")
		//rect calories line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(d.day) + 7)
			.attr('x2', d => x_Scale(d.day) + 7)
			.attr('y1', d => graphHeight + margin.bottom)
			.attr('y2', d => graphHeight + margin.bottom)
			.transition()
			.duration(700)
			.attr('y2', d => graphHeight - y_Calories_Scale(d.calories))
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"butt")
		// tooltips
		data.forEach((d, index) => { 
			let group = svg.append("g")
				.attr("id", `day${index+1}`)
			// create gray rectangles for hover
			group.append("rect")
				.attr("x", x_Scale(index+1) - 40)
				.attr("y", margin.top + 4)
				.attr("width", 80)
				.attr("height", 195)
				.attr('fill', 'gray')
				.attr("opacity", "0")
				// make it appear on hover + make the infos appears
				.on("mouseover", function () {
					d3.select(this).transition()
						.duration("150")
						.attr("opacity", ".2")
					d3.selectAll(`#day${index+1} > *:not(:first-child)`).transition()
						.duration("150")
						.attr("opacity", "1")
					})
				.on("mouseout", function () {
					d3.select(this).transition()
						.duration("150")
						.attr("opacity", "0")
					d3.selectAll(`#day${index+1} > *:not(:first-child)`).transition()
						.attr("opacity", "0")
					})
			// infos bubble 
			group.append("rect")
				.attr("x", displayTooltip(index+1) + 25)
				.attr("y", 40)
				.attr("width", 60)
				.attr("height", 70)
				.attr("opacity", "0")
				.attr('fill', 'red')
			group.append("text")
				.attr("x", displayTooltip(index+1) + 55)
				.attr("y", 65)
				.text(d.kilogram + "Kg")  
				.style("text-anchor", "middle")
				.style("font-size", "13px")
				.style('fill', '#fff')
				.attr("opacity", "0")
			group.append("text")
				.attr("x", displayTooltip(index+1) + 55)
				.attr("y", 95)
				.text(d.calories + "Kcal")   
				.style("text-anchor", "middle")
				.style("font-size", "13px")
				.style('fill', '#fff')   
				.attr("opacity", "0")
		})
		// Just to be sure a tooltip don't go outside the chart
		function displayTooltip(index) {
			if(x_Scale(index) <= graphWidth -margin.left -margin.right) 
				return x_Scale(index)
			else 
				return x_Scale(index) -100
		}

	}

	return <div className="barchart-container" ref={chartContainerRef} style={{ height:svgHeight}}></div>

}

const data_shape_prop = {
	day: PropTypes.string.isRequired, 
	kilogram: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired
}

BarChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape(data_shape_prop)).isRequired,
	svgHeight: PropTypes.number,
}