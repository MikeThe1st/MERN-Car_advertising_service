import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/CarEditPage.css'
const CarEditPage = () => {
  const location = useLocation(); // Access the full URL location
  const [car, setCar] = useState(null); // State to store the car data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [seller, setSeller] = useState(null); // State for storing seller info
  const [formData, setFormData] = useState({}); // State for form data

  // Extract the `id` from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  // Fetch car data and seller data from backend
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!id) {
        setError('No car ID provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/backend/cars/car/${id}`);
        setCar(response.data.updatedCar);
        setSeller(response.data.seller[0]);
        setFormData({
          brand: response.data.updatedCar.brand,
          model: response.data.updatedCar.model,
          year: response.data.updatedCar.year,
          mileage: response.data.updatedCar.mileage,
          enginePower: response.data.updatedCar.enginePower,
          color: response.data.updatedCar.color,
          fuel: response.data.updatedCar.fuel,
          transmission: response.data.updatedCar.transmission,
          location: response.data.updatedCar.location,
          description: response.data.updatedCar.description,
          damaged: response.data.updatedCar.damaged,
        });
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to load car data.');
      } finally {
        setLoading(false);
      }
    }, 300); // Delay of 300ms

    return () => clearTimeout(timeout); // Clear timeout if component unmounts
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/backend/cars/update-car/${id}`,
        formData
      );
      console.log('Car updated:', response.data);
      // Handle success - maybe show a success message or redirect
    } catch (err) {
      console.error('Error updating car:', err);
      setError('Failed to update car data.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="car-edit-container">
      <h1 className="car-edit-title">Edycja ogłoszenia samochodowego</h1>
      {car && seller && (
        <form onSubmit={handleSubmit} className="car-edit-form">
          <div className="car-edit-table-container">
            <table className="car-edit-table">
              <tbody>
                <tr>
                  <td>Marka</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={formData.brand || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={formData.model || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Rok produkcji</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name="year"
                      value={formData.year || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Przebieg (km)</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name="mileage"
                      value={formData.mileage || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Moc silnika (KM)</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name="enginePower"
                      value={formData.enginePower || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Kolor</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="color"
                      value={formData.color || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Paliwo</td>
                  <td>
                    <select
                      name="fuel"
                      className="form-select"
                      value={formData.fuel || ''}
                      onChange={handleChange}
                    >
                      <option value="">Wybierz</option>
                      <option value="Benzyna">Benzyna</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Elektryczny">Elektryczny</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Skrzynia biegów</td>
                  <td>
                    <select
                      name="transmission"
                      className="form-select"
                      value={formData.transmission || ''}
                      onChange={handleChange}
                    >
                      <option value="">Wybierz</option>
                      <option value="Manualna">Manualna</option>
                      <option value="Automatyczna">Automatyczna</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Lokalizacja</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Opis</td>
                  <td>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleChange}
                      rows="4"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pojazd uszkodzony?</td>
                  <td>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="damaged"
                        value="true"
                        className="form-check-input"
                        checked={formData.damaged === true}
                        onChange={() => setFormData({ ...formData, damaged: true })}
                      />
                      <label className="form-check-label">Tak</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="damaged"
                        value="false"
                        className="form-check-input"
                        checked={formData.damaged === false}
                        onChange={() => setFormData({ ...formData, damaged: false })}
                      />
                      <label className="form-check-label">Nie</label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Zapisz zmiany</button>
        </form>
      )}
      {seller && (
        <div className="seller-info mt-4">
          <h4>Sprzedawca</h4>
          <p>Imię: {seller.name}</p>
          <p>Kontakt: {seller.contact}</p>
          <p>Email: {seller.email}</p>
          <p>Telefon: {seller.phone}</p>
        </div>
      )}
    </div>
  );
};

export default CarEditPage;
