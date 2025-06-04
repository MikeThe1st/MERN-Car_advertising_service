import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"

export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, sellerType } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword, phoneNumber, sellerType })
        await newUser.save()

        return res.status(200).json(newUser)
    } catch (error) {
        console.error('Registration failed:', error)
        return res.status(500).json({ error: 'Registration failed.' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const loginUser = await User.findOne({ email: email })
        if (!loginUser) {
            return res.status(404).json({ msg: 'Please provide valid email and password.' })
        }
        if (!loginUser.isActive) {
            return res.status(403).json({ msg: 'Twoje konto jest nieaktywne. Skontaktuj się z administratorem.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password)

        if (isPasswordCorrect) {
            console.log('Password matches. Login successful.')
            const secretKey = process.env.JWT_SECRET
            const token = jwt.sign(email, secretKey)
            res.cookie("token", token, { httpOnly: false, secure: true, path: '/', sameSite: 'none', expiresIn: '1d' })
            return res.status(200).json({ token, msg: 'Login success.', login: loginUser.login })
        }
        else {
            console.log('Password does not match. Login failed.')
            return res.status(409).json({ msg: 'Please provide valid email and password.' })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Login failed.' })
    }
}

export const getUser = async (req, res) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(404).json({ error: "Token not found.", status: false });
        }

        // Check if secret key is configured
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res
                .status(500)
                .json({ error: "JWT secret key is not configured.", status: false });
        }

        // Verify and decode the token
        const decodedEmail = jwt.verify(token, secretKey);

        if (!decodedEmail) {
            return res.status(400).json({ error: "Invalid token payload.", status: false });
        }

        // Fetch user from the database
        const user = await User.findOne({ email: decodedEmail }).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found.", status: false });
        }

        return res.status(200).json([user]);
    } catch (error) {
        console.error("Error during user authentication:", error.message);
        return res
            .status(500)
            .json({ error: "Authentication failed. Please try again.", status: false });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: 'Token not found.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ error: 'Invalid token.' });
        }

        const user = await User.findOne({ email: decoded }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Send the user data excluding the password
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ error: 'Server error.' });
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const token = req.cookies?.token; // Pobieranie tokena z ciasteczek
        if (!token) {
            return res.status(401).json({ msg: 'Brak tokena uwierzytelniającego.' });
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ error: "JWT secret key is not configured." });
        }

        let decodedEmail;
        try {
            decodedEmail = jwt.verify(token, secretKey);
        } catch (error) {
            return res.status(401).json({ msg: 'Nieprawidłowy lub wygasły token.' });
        }
        
        const { name, phoneNumber, _id } = req.body;
        const updatedUser = await User.findByIdAndUpdate(_id, {
            name,
            decodedEmail,
            phoneNumber,
        }, { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const token = req.cookies?.token; // Pobieranie tokena z ciasteczek
        if (!token) {
            return res.status(401).json({ msg: 'Brak tokena uwierzytelniającego.' });
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ error: "JWT secret key is not configured." });
        }

        let decodedEmail;
        try {
            decodedEmail = jwt.verify(token, secretKey);
        } catch (error) {
            return res.status(401).json({ msg: 'Nieprawidłowy lub wygasły token.' });
        }

        const { prevPassword, newPassword, repeatPassword } = req.body;

        if (!prevPassword || !newPassword || !repeatPassword) {
            return res.status(400).json({ msg: 'Wszystkie pola są wymagane.' });
        }

        const user = await User.findOne({ email: decodedEmail }); 
        if (!user) {
            return res.status(404).json({ msg: 'Użytkownik nie znaleziony.' });
        }

        const isMatch = await bcrypt.compare(prevPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Poprzednie hasło jest niepoprawne.' });
        }

        if (newPassword !== repeatPassword) {
            return res.status(400).json({ msg: 'Nowe hasła nie pasują do siebie.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ msg: 'Hasło zostało pomyślnie zaktualizowane.' });
    } catch (err) {
        console.error('Błąd podczas aktualizacji hasła:', err);
        return res.status(500).json({ error: 'Nie udało się zaktualizować hasła.' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ msg: `User with email: ${email} not found.`, status: false })
        }

        const minLength = 8
        const maxLength = 15
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '0123456789'
        const specialCharacters = '-_!*#$&'

        // Ensure the inclusion of at least one character from each required set
        const passwordArray = [
            upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)],
            lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            specialCharacters[Math.floor(Math.random() * specialCharacters.length)],
        ]

        const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters

        // Calculate the remaining length to fill (subtract 4 because we already have 4 characters guaranteed)
        const remainingLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength - 4

        for (let i = 0; i < remainingLength; i++) {
            passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)])
        }

        // Shuffle the array to ensure the order of characters is random
        const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

        const password = shuffleArray(passwordArray).join('')

        // Sending email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDING_MAIL,
                pass: process.env.SENDING_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SENDING_MAIL,
            to: email,
            subject: 'Recovery password - AutoMarket',
            text: `Password: ${password}`
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Updating user
        await User.findOneAndUpdate({ email: email }, { password: hashedPassword, resetPassword: true })

        return res.status(201).json({ user: user, newPassword: password })
    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed.', status: false })
    }
}