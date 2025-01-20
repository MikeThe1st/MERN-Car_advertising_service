import React from "react";

import Navbar from "../components/Navbar"
import PasswordRecovery from "../components/PasswordRecovery ";

const PasswordPage = () => {
	return (
		<div className="w-screen">
			<Navbar/>
            <PasswordRecovery/>
			
		</div>
	);
};

export default PasswordPage;
