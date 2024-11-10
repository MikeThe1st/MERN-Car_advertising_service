import React from "react";
import Navbar from "../components/Navbar";
import ContactPageForm from "../components/ContactPageForm";
const ContactPage = () => {
	return (
		<div className="w-screen">
			
			<Navbar/>
           <ContactPageForm/>
			
		</div>
	);
};

export default ContactPage;