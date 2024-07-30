
function CustomToolTip({ payload }) {
	if (payload && payload.length) {
		return (
			<div className="tooltip">
				<p>{payload[0].value + ' min'}</p>
			</div>
		)
	}
	return null 
}


export default CustomToolTip
