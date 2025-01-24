import React from 'react';
import CarEditPage from '../components/CarEditPage'; 
import Navbar from '../components/Navbar'; 
const EditCarPage = () => {
  return (
    <div>
     
      <main className="container mt-5">
        <Navbar/>
        <CarEditPage />
      </main>


    </div>
  );
};

export default EditCarPage;
