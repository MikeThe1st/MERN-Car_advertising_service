import React, { useState, useEffect } from 'react';
import '../css/AddCarBrandModel.css'; // Import CSS file
import axios from 'axios';

const AddCarBrandModel = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [isBrandButtonActive, setIsBrandButtonActive] = useState(false);
  const [isModelButtonActive, setIsModelButtonActive] = useState(false);

  // Fetch existing brands from the backend
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3000/backend/cars/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Handle adding a new brand
  const handleAddBrand = async () => {
    if (isBrandButtonActive) {
      try {
        await axios.post('http://localhost:3000/backend/cars/add-brand', { brand });
        alert(`Marka "${brand}" została dodana.`);
        setBrand('');
        setIsBrandButtonActive(false);
      } catch (error) {
        console.error('Error adding brand:', error);
      }
    }
  };

  // Handle adding a new model
  const handleAddModel = async () => {
    if (isModelButtonActive) {
      try {
        await axios.post('http://localhost:3000/backend/cars/add-model', {
          brand: selectedBrand,
          model,
        });
        alert(`Model "${model}" został dodany do marki "${selectedBrand}".`);
        setModel('');
        setSelectedBrand('');
        setIsModelButtonActive(false);
      } catch (error) {
        console.error('Error adding model:', error);
      }
    }
  };

  // Validate form for adding a brand
  useEffect(() => {
    setIsBrandButtonActive(!!brand);
  }, [brand]);

  // Validate form for adding a model
  useEffect(() => {
    setIsModelButtonActive(!!selectedBrand && !!model);
  }, [selectedBrand, model]);

  return (
    <div className="add-car-brand-model">
      <h2>Dodaj Nową Markę</h2>
      <div>
        <label htmlFor="brand">Marka samochodu:</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Wprowadź markę"
        />
      </div>
      <button
        onClick={handleAddBrand}
        disabled={!isBrandButtonActive}
        style={{
          backgroundColor: isBrandButtonActive ? 'green' : 'gray',
          color: 'white',
          cursor: isBrandButtonActive ? 'pointer' : 'not-allowed',
        }}
      >
        Dodaj markę
      </button>

      <h2>Dodaj Nowy Model</h2>
      <div>
        <label htmlFor="selectedBrand">Wybierz markę:</label>
        <select
          id="selectedBrand"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Wybierz markę</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="model">Model samochodu:</label>
        <input
          id="model"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Wprowadź model"
        />
      </div>
      <button
        onClick={handleAddModel}
        disabled={!isModelButtonActive}
        style={{
          backgroundColor: isModelButtonActive ? 'blue' : 'gray',
          color: 'white',
          cursor: isModelButtonActive ? 'pointer' : 'not-allowed',
        }}
      >
        Dodaj model
      </button>
    </div>
  );
};

export default AddCarBrandModel;
