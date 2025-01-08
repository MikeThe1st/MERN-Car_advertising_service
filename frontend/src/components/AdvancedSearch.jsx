import React, { useState } from "react";
import "../css/AdvancedSearch.css";

import axios from "axios";

const AdvancedSearch = ({ onSearch, cars, setCars }) => {
	const [filters, setFilters] = useState({
		brand: "",
		model: "",
		gearbox: "",
		minPrice: "",
		maxPrice: "",
		minYear: "",
		maxYear: "",
		fuelType: "",
		minMileage: "",
		maxMileage: "",
		location: "",
		is_damaged: '',
		minHorsePower: '',
		maxHorsePower: '',
	});

	const [models, setModels] = useState([]);


	const brandModels = {
		Mercedes: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA"],
		BMW: ["1 Series", "3 Series", "5 Series", "7 Series", "X5"],
		Audi: ["A3", "A4", "A6", "Q5", "Q7"],
		Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Arteon"],
		Toyota: ["Corolla", "Camry", "RAV4", "Yaris", "Hilux"],
		Honda: ["Civic", "Accord", "CR-V", "Jazz", "HR-V"],
		Ford: ["Fiesta", "Focus", "Mondeo", "Mustang", "Kuga"],
		Chevrolet: ["Spark", "Malibu", "Equinox", "Tahoe", "Traverse"],
		Nissan: ["Micra", "Qashqai", "X-Trail", "Juke", "Navara"],
		Hyundai: ["i10", "i20", "i30", "Tucson", "Santa Fe"],
		Kia: ["Rio", "Ceed", "Sportage", "Sorento", "Picanto"],
		Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-5", "CX-30"],
		Renault: ["Clio", "Megane", "Kadjar", "Talisman", "Captur"],
		Peugeot: ["208", "308", "508", "2008", "3008"],
		Fiat: ["500", "Panda", "Tipo", "Doblo", "Punto"],
		Volvo: ["XC40", "XC60", "XC90", "S60", "V60"],
		Opel: ["Corsa", "Astra", "Insignia", "Crossland", "Mokka"],
		Jeep: ["Renegade", "Compass", "Wrangler", "Cherokee", "Grand Cherokee"],
		Subaru: ["Impreza", "Outback", "Forester", "XV", "Legacy"],
		Skoda: ["Octavia", "Superb", "Fabia", "Kodiaq", "Kamiq"],
		Seat: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"],
		Suzuki: ["Swift", "Vitara", "Jimny", "Baleno", "SX4"],
	};

	// Obsługa zmian w formularzu
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;

		// Aktualizacja dostępnych modeli na podstawie wybranej marki
		if (name === "brand") {
			setModels(brandModels[value] || []); // Pobranie modeli dla wybranej marki
			setFilters((prevFilters) => ({
				...prevFilters,
				model: "", // Resetuje wybrany model przy zmianie marki
			}));
		}

		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		console.log(filters)
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:3000/backend/cars/search", filters);

			if (response.status === 200) {
				setCars(response.data); // Update the cars state with the fetched data
			} else {
				console.error("Search failed:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching cars:", error);
		}
	};

	return (
		<div className="advanced-search-horizontal">
			<form onSubmit={handleSearch} className="search-form-horizontal">
				<select name="brand" value={filters.brand} onChange={handleInputChange}>
					<option value="">Marka pojazdu</option>
					{Object.keys(brandModels).map((brand) => (
						<option key={brand} value={brand}>
							{brand}
						</option>
					))}
				</select>

				<select
					name="model"
					value={filters.model}
					onChange={handleInputChange}
					disabled={!filters.brand}
				>
					<option value="">Model pojazdu</option>
					{models.map((model) => (
						<option key={model} value={model}>
							{model}
						</option>
					))}
				</select>

				<select
					name="gearbox"
					value={filters.gearbox}
					onChange={handleInputChange}
				>
					<option value="">Skrzynia biegów</option>
					<option value="Manualna">Manualna</option>
					<option value="Automatyczna">Automatyczna</option>
				</select>

				<input
					type="number"
					name="minPrice"
					placeholder="Cena od"
					value={filters.minPrice}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="maxPrice"
					placeholder="Cena do"
					value={filters.maxPrice}
					onChange={handleInputChange}
				/>

				<input
					type="number"
					name="minYear"
					placeholder="Rok produkcji od"
					value={filters.minYear}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="maxYear"
					placeholder="Rok produkcji do"
					value={filters.maxYear}
					onChange={handleInputChange}
				/>

				<select
					name="fuelType"
					value={filters.fuelType}
					onChange={handleInputChange}
				>
					<option value="">Rodzaj paliwa</option>
					<option value="Benzyna">Benzyna</option>
					<option value="Diesel">Diesel</option>
					<option value="Hybryda">Hybryda</option>
					<option value="Elektryczny">Elektryczny</option>
				</select>

				<input
					type="number"
					name="minMileage"
					placeholder="Przebieg od"
					value={filters.minMileage}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="maxMileage"
					placeholder="Przebieg do"
					value={filters.maxMileage}
					onChange={handleInputChange}
				/>

				<input
					type="text"
					name="location"
					placeholder="Lokalizacja"
					value={filters.location}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="minHorsePower"
					placeholder="Min moc (KM)"
					value={filters.minHorsePower}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="maxHorsePower"
					placeholder="Max moc (KM)"
					value={filters.maxHorsePower}
					onChange={handleInputChange}
				/>
				<select
					name="is_damaged"
					value={filters.is_damaged}
					onChange={handleInputChange}
				>
					<option value="">Stan uszkodzenia</option>
					<option value="true">Uszkodzony</option>
					<option value="false">Nieuszkodzony</option>
				</select>
				<button type="submit" className="search-button">
					Szukaj
				</button>
			</form>
		</div>
	);
};

export default AdvancedSearch;
