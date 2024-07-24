import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Profil from './pages/Profil/Profil'
import Settings from './pages/Settings/Settings'
import Community from './pages/Community/Community'


function App() {
	return (
		<div className="App">
			<Header />
			<Sidebar />
			<main>
				<Routes>
					<Route path="/" element={<Navigate replace to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route exact path="/profil/:userId" element={<Profil />} /> 
					<Route exact path="/settings" element={<Settings />} />
					<Route exact path="/community" element={<Community />} /> 
				</Routes>
			</main>
		</div>
	);
}

export default App
