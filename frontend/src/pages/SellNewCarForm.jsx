import React from "react";
import Navbar from "../components/Navbar";
import CarListingForm from "../components/CarListingForm";

const SellNewCarForm = () => {
	return (
		<div className="w-screen">
			
			<Navbar/>
            <CarListingForm/>
			
		</div>
	);
};

export default SellNewCarForm;