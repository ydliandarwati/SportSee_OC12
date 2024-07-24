import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const Context = createContext()

// Provider of the data for the app using context and state
export const Provider = ({ children }) => {
	const [userToggle, setUserToggle] = useState(false)

	return (
		<Context.Provider
			value={{
				userToggle,
				setUserToggle,
			}}
		>
			{children}
		</Context.Provider>
	)
}

Provider.propTypes = {
	children: PropTypes.object.isRequired,
}
