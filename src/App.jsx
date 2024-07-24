import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Profil from './pages/Profil/Profil'


function App() {
	console.log(document.location.pathname)
	return (
		<div className="App">
			<Header />
			<Sidebar />
			<main>
				<Routes>
					{/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
					<Route exact path="/" element={<Home />} />
					<Route exact path="/profil/:userId" element={<Profil />} /> 
					<Route exact path="/settings" element={<Home />} />
					<Route exact path="/community" element={<Home />} /> 
				</Routes>
			</main>
		</div>
	);
}

export default App
