const axios = require('axios');

const validateEmail = async (email) => {
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=e93dfe0babd84e35bf33be23e29480c7&email=${email}`);
        return response.data.is_valid_format.value;
    } catch (error) {
        console.error(`Error validating email ${email}:`, error);
        return false;
    }
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

module.exports = { validateEmail, validatePassword, validatePhone };
