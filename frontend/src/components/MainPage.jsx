import React from 'react';
import SearchBar from '../components/SearchBar'; // Upewnij się, że ścieżka jest poprawna
import "../css/MainPage.css"; // Zmień na .css
 // Załaduj własny plik CSS

const MainPage = () => {
    const handleSearch = (query) => {
        console.log("Wyszukiwanie:", query);
        // Tutaj dodaj logikę wyszukiwania, np. API
    };

    return (
        <div className="container mt-4">
            <header className="text-center mb-4">
                <h1>AutoMarket</h1>
                <p>Najlepsze miejsce na zakup i sprzedaż samochodów</p>
            </header>

            {/* Wyszukiwarka */}
            <SearchBar onSearch={handleSearch} />

            {/* Sekcja najpopularniejszych samochodów */}
            <section className="mt-4">
                <h2>Najpopularniejsze samochody</h2>
                <div className="row">
                    {/* Przykładowe karty samochodów */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <img 
                                    src={`https://via.placeholder.com/150?text=Samochód+${index + 1}`} 
                                    className="card-img-top" 
                                    alt={`Samochód ${index + 1}`} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Samochód {index + 1}</h5>
                                    <p className="card-text">Opis samochodu {index + 1}.</p>
                                    <a href="#" className="btn btn-primary">Zobacz więcej</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center mt-4">
                <p>© 2024 AutoMarket. Wszelkie prawa zastrzeżone.</p>
            </footer>
        </div>
    );
};

export default MainPage;
