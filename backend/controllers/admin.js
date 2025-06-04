import User from "../models/User.js"

export const changeUserStatus = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'Nieprawidłowa wartość statusu. Oczekiwano true/false.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Błąd podczas zmiany statusu użytkownika:', err);
        res.status(500).json({ error: 'Nie udało się zmienić statusu użytkownika.' });
    }
};

export const changeUserAdmin = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { isAdmin } = req.body; // Ta zmienna będzie teraz reprezentować *nowy* status isAdmin

        if (typeof isAdmin !== 'boolean') {
            return res.status(400).json({ error: 'Nieprawidłowa wartość uprawnień administratora. Oczekiwano true/false.' });
        }
        
        console.log("Nowy status isAdmin otrzymany z frontendu:", isAdmin); // Debug log

        // Poprawiona logika: Jeśli isAdmin jest true, sellerType to "Admin", w przeciwnym razie "Użytkownik"
        const updatedSellerType = isAdmin ? "Admin" : "Użytkownik"; // POPRAWIONA LOGIKA

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                isAdmin, // Używamy bezpośrednio wartości isAdmin z req.body
                sellerType: updatedSellerType
            },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });
        }

        console.log("Status isAdmin po aktualizacji w bazie danych:", updatedUser.isAdmin); // Debug log
        console.log("Typ sprzedawcy po aktualizacji w bazie danych:", updatedUser.sellerType); // Debug log

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Błąd podczas zmiany roli administratora:', err);
        res.status(500).json({ error: 'Nie udało się zmienić roli administratora.' });
    }
};