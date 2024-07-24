import PropTypes from 'prop-types'

import './style.scss'

/**
 * Render a div (charts-card) containing the charts
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function ChartsCard({ className, content }) {
	return <div className={'charts-card ' + className}>{content}</div>
}

ChartsCard.propTypes = {
	/**
	 * Class name of the charts-card
	 */
	className: PropTypes.string,
	/**
	 * Content of the charts-card
	 */
	content: PropTypes.object.isRequired,
}

export default ChartsCard
