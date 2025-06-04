import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ msg: 'Brak tokena uwierzytelniającego. Dostęp zabroniony.' });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.error("JWT secret key is not configured in environment variables.");
        return res.status(500).json({ error: "Błąd serwera: brak klucza uwierzytelniającego." });
    }

    try {
        const decodedEmail = jwt.verify(token, secretKey); 
        const user = await User.findOne({ email: decodedEmail });

        if (!user) {
            return res.status(404).json({ msg: 'Użytkownik powiązany z tokenem nie znaleziony.' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'Brak uprawnień administratora. Dostęp zabroniony.' });
        }
        next(); 

    } catch (error) {
        console.error('Błąd weryfikacji tokena JWT w verifyAdmin:', error);
        return res.status(401).json({ msg: 'Nieprawidłowy lub wygasły token. Zaloguj się ponownie.' });
    }
};