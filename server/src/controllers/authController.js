const User = require('../models/User');
const jwt = require('jsonwebtoken');

let tokenBlacklist = [];

class AuthController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already taken' });
            }
            const user = new User({ username, email, password });
            await user.save();
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
        } catch (error) {
            res.status(400).json({ message: 'Error during registration', error });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
        } catch (error) {
            res.status(500).json({ message: 'Error during login', error });
        }
    }

    async logout(req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(400).json({ message: 'Token is required for logout' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            tokenBlacklist.push(token);
            res.status(200).json({ message: 'Successfully logged out' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token', error });
        }
    }

    async getProfile(req, res) {
        try {
            const userId = req.user.id; // ID користувача з токена
            const user = await User.findById(userId).select('username email'); // Вибираємо лише username і email

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ username: user.username, email: user.email });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user profile', error: error.message });
        }
    }
}

module.exports = new AuthController();