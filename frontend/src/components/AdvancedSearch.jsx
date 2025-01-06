import React, { useState } from "react";
import "../css/AdvancedSearch.css";

const AdvancedSearch = ({ onSearch }) => {
	const [filters, setFilters] = useState({
		brand: "",
		model: "",
		generation: "",
		bodyType: "",
		minPrice: "",
		maxPrice: "",
		minYear: "",
		maxYear: "",
		fuelType: "",
		minMileage: "",
		maxMileage: "",
		location: "",
		damageStatus: "",
		searchText: "",
		financing: false,
		specialPrograms: "",
		gearbox: "",
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

	const handleSearch = (e) => {
		e.preventDefault();
		onSearch(filters); // Przekazujemy filtry do komponentu nadrzędnego
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

				{/* Pozostałe pola formularza */}
				<select
					name="gearbox"
					value={filters.gearbox}
					onChange={handleInputChange}
				>
					<option value="">Skrzynia biegów</option>
					<option value="Manualna">Manualna</option>
					<option value="Automatyczna">Automatyczna</option>
					<option value="Półautomatyczna">Półautomatyczna</option>
					<option value="Dwusprzęgłowa">Dwusprzęgłowa</option>
					<option value="CVT">CVT (bezstopniowa)</option>
					<option value="Tiptronic">Tiptronic</option>
					<option value="Sekwencyjna">Sekwencyjna</option>
				</select>

				<select
					name="generation"
					value={filters.generation}
					onChange={handleInputChange}
				>
					<option value="">Generacja</option>
					<option value="I">I</option>
					<option value="II">II</option>
					<option value="III">III</option>
					<option value="IV">IV</option>
					<option value="V">V</option>
					<option value="VI">VI</option>
					<option value="VII">VII</option>
					<option value="VIII">VIII</option>
					<option value="IX">IX</option>
					<option value="X">X</option>
					<option value="Inna">Inna</option>
				</select>

				<select
					name="bodyType"
					value={filters.bodyType}
					onChange={handleInputChange}
				>
					<option value="">Typ nadwozia</option>
					<option value="SUV">SUV</option>
					<option value="Sedan">Sedan</option>
					<option value="Kombi">Kombi</option>
					<option value="Hatchback">Hatchback</option>
					<option value="Coupe">Coupe</option>
					<option value="Cabrio">Cabrio</option>
					<option value="Pickup">Pickup</option>
					<option value="Van">Van</option>
					<option value="Minivan">Minivan</option>
					<option value="Terenowy">Terenowy</option>
					<option value="Liftback">Liftback</option>
					<option value="Roadster">Roadster</option>
					<option value="Limuzyna">Limuzyna</option>
					<option value="Microcar">Microcar</option>
					<option value="Fastback">Fastback</option>
					<option value="Crossover">Crossover</option>
					<option value="Sportowy">Sportowy</option>
					<option value="Dostawczy">Dostawczy</option>
					<option value="Inne">Inne</option>
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

				<select
					name="damageStatus"
					value={filters.damageStatus}
					onChange={handleInputChange}
				>
					<option value="">Stan uszkodzeń</option>
					<option value="Nieuszkodzony">Nieuszkodzony</option>
					<option value="Uszkodzony">Uszkodzony</option>
				</select>
				<button type="submit" className="search-button">
					Szukaj
				</button>
			</form>
		</div>
	);
};

export default AdvancedSearch;
