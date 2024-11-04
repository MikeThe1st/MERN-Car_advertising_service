import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PageMain from "./pages/PageMain.jsx";
import Profile from "./pages/Profile.jsx";


function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					
					<Route element={<Login />} path="/Login" />
					<Route element={<Register />} path="/
					Register" />
					<Route element={<PageMain />} path="/" />
					<Route element={<Profile/>} path="/Profile"/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
