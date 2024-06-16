const { validateEmail, validatePassword, validatePhone } = require('../services/validateService');

const validateUser = async (req, res, next) => {
    const { email, password, phone } = req.body;
    const errors = [];

    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) {
        errors.push('Invalid email format');
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        errors.push(passwordError);
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
        errors.push(phoneError);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateUser };
