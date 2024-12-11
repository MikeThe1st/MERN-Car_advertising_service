import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password)

        if (isPasswordCorrect) {
            console.log('Password matches. Login successful.')
            const secretKey = process.env.JWT_SECRET
            console.log(secretKey)
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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