import {
	LineChart,
	Line,
	XAxis,
	Tooltip,
	YAxis,
	ResponsiveContainer,
} from 'recharts'

import CustomToolTip from './CustomToolTip'

import './style.scss'

// create line chart (input data)
function ChartLine({ data }) {

	// format the label (based on weekdays)
	const formatLabel = (value) => {
		if (value === 1) return 'L'
		if (value === 2) return 'M'
		if (value === 3) return 'M'
		if (value === 4) return 'J'
		if (value === 5) return 'V'
		if (value === 6) return 'S'
		if (value === 7) return 'D'
		return value
	}

	return (
		<>
			<h3 className="chartaverage-sessions-title">
				Durée moyenne des <br />
				sessions
			</h3>
			<ResponsiveContainer width="70%" height="70%" className={'center'}>
				<LineChart data={data}>
					<Line
						type="natural"
						dataKey="sessionLength"
						stroke="url(#colorUv)"
						strokeWidth={2}
						activeDot={{
							stroke: '#FFF',
							strokeWidth: 4,
							r: 2,
						}}
						dot={false}
					/>
					<XAxis
						dataKey="day"
						axisLine={false}
						tickLine={false}
						tick={{
							fill: 'rgba(255,255,255,0.6)',
							fontSize: '0.75rem',
						}}
						tickFormatter={formatLabel}
						tickMargin={20}
					/>
					<Tooltip content={<CustomToolTip />} cursor={false} />
					<YAxis hide domain={['dataMin-10', 'dataMax+10']} />
					<defs>
						<linearGradient
							id="colorUv"
							x1="0%"
							y1="0"
							x2="100%"
							y2="0"
						>
							<stop
								offset="0%"
								stopColor="rgba(255, 255, 255, 0.3)"
							/>
							<stop
								offset="20%"
								stopColor="rgba(255, 255, 255, 0.4)"
							/>
							<stop
								offset="40%"
								stopColor="rgba(255, 255, 255, 0.5)"
							/>
							<stop
								offset="60%"
								stopColor="rgba(255, 255, 255, 0.6)"
							/>
							<stop
								offset="100%"
								stopColor="rgba(255, 255, 255, 1)"
							/>
						</linearGradient>
					</defs>
				</LineChart>
			</ResponsiveContainer>
		</>
	)
}

export default ChartLine
