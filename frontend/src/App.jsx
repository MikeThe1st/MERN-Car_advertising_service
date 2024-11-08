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

	return (
		<>
			<BrowserRouter>
				<Routes>

					<Route element={<Login />} path="/login" />
					<Route element={<Register />} path="/register" />
					<Route element={<PageMain />} path="/" />
					<Route element={<Profile />} path="/profile" />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
