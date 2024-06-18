const UserToDB = require('../models/user')
const bcrypt = require('bcrypt')

const passwordNotInUse = async (username, password, userId = null) => {
    console.log("Password");

    if (userId) {
        const currentUser = await UserToDB.findById(userId);
        if (currentUser) {
            const isSamePassword = await bcrypt.compare(password, currentUser.password);
            if (isSamePassword) {
                return null;
            }
        }
    }

    const existingUsers = await UserToDB.find({ username });

    for (const user of existingUsers) {
        if (userId && user._id.toString() === userId) {
            continue;
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            return 'Password already in use';
        }
    }
    return null;
};


const validatePassword = (password) => {
    const minLength = parseInt(process.env.MIN_PASSWORD_LENGTH, 10) || 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long`;
    }
    if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
        return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
        return 'Password must contain at least one special character';
    }
    return null; // Password is valid
};

const validatePhone = (phone) => {
    const phonePattern = /^\d{2,3}-\d{7}$/;
    if (!phonePattern.test(phone)) {
        return 'Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXX and be 10 or 11 digits long';
    }
    return null; // Phone is valid
};

module.exports = { passwordNotInUse, validatePassword, validatePhone };
