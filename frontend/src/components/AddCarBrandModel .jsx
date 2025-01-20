import React, { useState } from 'react';
import '../css/AddCarBrandModel.css';  // Importujemy plik CSS

const AddCarBrandModel = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Funkcja do obsługi zmiany w polu marki
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  // Funkcja do obsługi zmiany w polu modelu
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  // Funkcja do aktywowania/Deaktywowania przycisku na podstawie wypełnienia pól
  const validateForm = () => {
    if (brand && model) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  // Funkcja do obsługi kliknięcia przycisku
  const handleAddCar = () => {
    if (isButtonActive) {
      console.log(`Dodano markę: ${brand}, Model: ${model}`);
      // Można dodać logikę zapisywania danych, np. do bazy danych
      setBrand('');
      setModel('');
      setIsButtonActive(false);
    }
  };

  // Sprawdzamy formularz na każdym wprowadzeniu danych
  React.useEffect(() => {
    validateForm();
  }, [brand, model]);

  return (
    <div className="add-car-brand-model">
      <h2>Dodaj Nową Markę i Model Samochodu</h2> {/* Tytuł komponentu */}
      <div>
        <label htmlFor="brand">Marka samochodu:</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={handleBrandChange}
          placeholder="Wprowadź markę"
        />
      </div>
      <div>
        <label htmlFor="model">Model samochodu:</label>
        <input
          id="model"
          type="text"
          value={model}
          onChange={handleModelChange}
          placeholder="Wprowadź model"
        />
      </div>
      <button
        onClick={handleAddCar}
        disabled={!isButtonActive}
        style={{
          backgroundColor: isButtonActive ? 'green' : 'gray',
          color: 'white',
          cursor: isButtonActive ? 'pointer' : 'not-allowed',
        }}
      >
        Dodaj nową markę
      </button>
    </div>
  );
};

export default AddCarBrandModel;
