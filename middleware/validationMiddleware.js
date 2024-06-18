const { passwordNotInUse, validatePassword, validatePhone } = require('../services/validateService');

const validateUser = async (req, res, next) => {
    const { username, password, phone } = req.body;
    const userId = req.params.id || null;
    const errors = [];

    const passwordUseError = await passwordNotInUse(username, password, userId);
    if (passwordUseError) {
        errors.push(passwordUseError);
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
