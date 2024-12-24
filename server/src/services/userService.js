const User = require('../models/User');
const Book = require('../models/Book');

class UserService {
    async getUserById(userId) {
        return User.findById(userId).select('-password');
    }

    async updateUserProfile(userId, profileData) {
        return User.findByIdAndUpdate(userId, profileData, {new: true}).select('-password');
    }

    async getUserBooks(userId) {
        return Book.find({owner: userId});
    }

    async deleteUser(userId) {
        await Book.deleteMany({ owner: userId });
        return User.findByIdAndDelete(userId);
    }
}

module.exports = new UserService();
