import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import PropTypes from 'prop-types'

import './style.scss'

// create a radial chart  
function ChartRadial({ data }) {
	const score = data.todayScore ? data.todayScore : data.score
	const dataArray = [{ name: 'score', value: score }]
	return (
		<>
			<h3 className="radialchart-title">Score</h3>
			<ResponsiveContainer width="70%" height="70%" className={'center'}>
				<RadialBarChart
					innerRadius="0%"
					outerRadius="0%"
					data={dataArray}
					startAngle={90}
					endAngle={450}
				>
					<RadialBar
						data={[{ value: 1 }]}
						dataKey="value"
						barSize={170}
						fill="#FFF"
						isAnimationActive={false}
					/>
					<RadialBar
						dataKey="value"
						barSize={10}
						cornerRadius={100}
						fill="#FF0000"
					/>
				</RadialBarChart>
			</ResponsiveContainer>
			<div className="radialchart-label center">
				<p className="percent">
					{data.score && data.score * 100}
					{data.todayScore && data.todayScore * 100}%
				</p>
				<p>de votre</p>
				<p>objectif</p>
			</div>
		</>
	)
}

ChartRadial.propTypes = {
	/**
	 * Data to be displayed in the chart
	 */
	data: PropTypes.object.isRequired,
}

export default ChartRadial
