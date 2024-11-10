import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css";
const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
			<div className="container-fluid">
				{/* Logo i nazwa serwisu */}
				<a className="navbar-brand" href="#">
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
							<a className="nav-link" href="#">
								Kup samochód
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Sprzedaj samochód
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								O nas
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/ContactPage">
								Kontakt
							</a>
						</li>
						{/* Akcje nawigacyjne */}
						<li className="nav-item">
							<a className="nav-link" href="/Profile">
								Profil
							</a>
						</li>
						<li className="nav-item">
							<a className="btn btn-sell" href="/SellNewCarForm" role="button">
								Wystaw auto
							</a>
						</li>
						<li className="nav-item">
							<a className="btn btn-login ms-2" href="/Login" role="button">
								Zaloguj się
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
