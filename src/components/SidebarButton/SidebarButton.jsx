import './style.scss'

function SidebarButton({ logo }) {
	return (
		<button className="sidebar-button">
			<img src={logo} alt="" className="sidebar-button-logo" />
		</button>
	)
}

export default SidebarButton
