import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CarListingForm from "../components/CarListingForm";
import axios from "axios"; // Don't forget to import axios

const SellNewCarForm = () => {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/backend/user/get-user",
					{ withCredentials: true }
				);
				setUser(response.data[0]);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUser();
	}, []);

	// Return a loading spinner if the user data is still being fetched
	if (user === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-screen">
			<Navbar />
			<CarListingForm email={user.email} />
		</div>
	);
};

export default SellNewCarForm;
