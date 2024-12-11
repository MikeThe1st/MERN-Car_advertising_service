import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css";
const Navbar = () => {
	// const [isNavOpen, setIsNavOpen] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/backend/user/get-user",
					{ withCredentials: true }
				);
				setUser(response.data[0]);
				console.log(response.data[0])
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("token="));

		if (token) {
			setIsLogged(true);
			getUser();
		} else {
			console.log("No token found.");
		}
	}, [isLogged]);

	// Toggle the navigation menu
	// const toggleNav = () => {
	// 	setIsNavOpen(!isNavOpen);
	// };

	// Logout function
	const logout = (cookieName) => {
		if (window.confirm("Czy na pewno chcesz się wylogować?")) {
			document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
			setIsLogged(false);
			window.location.href = "/login";
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
			<div className="container-fluid">
				{/* Logo i nazwa serwisu */}
				<a className="navbar-brand" href="/">
					AutoMarket
				</a>

				{/* Menu hamburger dla urządzeń mobilnych */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Linki nawigacyjne */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link active" href="/">
								Strona główna
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/BuyCar">
								Kup samochód
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/AboutUs">
								O nas
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/ContactPage">
								Kontakt
							</a>
						</li>
						{isLogged ? (
							<li className="nav-item">
								<a className="btn btn-sell" href="/SellNewCarForm" role="button">Wystaw auto
								</a>
							</li>) : (<a></a>)
						}

						<li className="nav-item mx-4">
							{isLogged ? (
								<div className="d-flex flex-column flex-lg-row gap-3 align-items-center">
									{/* Show user email */}
									<button
										className="btn btn-info text-white"
										onClick={() =>
											(window.location.href = `/profile`)
										}
									>
										{user?.email}
									</button>
									{/* Logout Button */}
									<button
										className="btn btn-danger"
										onClick={() => logout("token")}
									>
										Wyloguj się
									</button>
								</div>
							) : (
								<a className="btn btn-login ms-2" href="/Login" role="button">
									Zaloguj się
								</a>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
