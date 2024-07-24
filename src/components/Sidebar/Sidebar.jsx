import './style.scss'

import SidebarButton from '../SidebarButton'

import yoga from '../../assets/yoga.svg'
import swimming from '../../assets/swimming.svg'
import biking from '../../assets/biking.svg'
import haltere from '../../assets/haltere.svg'

/**
 * Render the sidebar with buttons and copyright
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function Sidebar() {
	return (
		<aside className="sidebar">
			<div className="sidebar-button-wrapper center">
				<SidebarButton logo={yoga} />
				<SidebarButton logo={swimming} />
				<SidebarButton logo={biking} />
				<SidebarButton logo={haltere} />
			</div>
			<p className="copyright">Copyright, SportSee 2020</p>
		</aside>
	)
}

export default Sidebar
