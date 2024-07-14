import React from "react"
import { Routes, Route } from "react-router-dom"
import { ViewportProvider } from "./utils/ViewportContext"
import "./index.css"
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"

function App() {
	return (
			<ViewportProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</ViewportProvider>
	);
}

export default App;
