const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
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
}

module.exports = new AuthController();