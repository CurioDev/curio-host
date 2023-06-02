import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Joystick from "./pages/Joystick";
import DriveByImage from "./pages/DriveByImage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="joystick/" element={<Joystick />} />
				<Route path="drive-by-image/" element={<DriveByImage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
