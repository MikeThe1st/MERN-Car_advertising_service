import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PageMain from "./pages/PageMain.jsx";
import Profile from "./pages/Profile.jsx";
import SellNewCarForm from "./pages/SellNewCarForm.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BuyCar from "./pages/BuyCar.jsx";
import CarPage from "./pages/CarPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import MessPage from './pages/MessPage.jsx'
import AdminRoutes from "./AdminRoutes.jsx";
import PasswordPage from "./pages/PasswordPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import EditCarPage from "./pages/EditCarPage.jsx";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>

					<Route element={<Login />} path="/login" />
					<Route element={<Register />} path="/register" />
					<Route element={<PageMain />} path="/" />
					<Route element={<Profile />} path="/profile" />
					<Route element={<SellNewCarForm />} path="/SellNewCarForm" />
					<Route element={<ContactPage />} path="/ContactPage" />
					<Route element={<AboutUs />} path="/AboutUs" />
					<Route element={<BuyCar />} path="/BuyCar" />
					<Route element={<CarPage />} path="/CarPage" />
					<Route element={<MessPage />} path="/MessPage" />
					<Route element={<PasswordPage/>} path="/PasswordPage"/>
					<Route element={<EditCarPage/>} path="/EditCarPage"/>
					<Route path="/ChatPage/:chatId" element={<ChatPage />} />

					<Route element={<AdminRoutes />}>
						<Route element={<AdminPage />} path="/AdminPage" />

					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
