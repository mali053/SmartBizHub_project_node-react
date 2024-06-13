const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserFromDB = require('../models/user')
const { validateEmail, validatePassword } = require('./validateService');

const signup = async (username, password, email, role) => {
    try {
        // שליפת כל המשתמשים עם אותו שם משתמש
        const existingUsers = await UserFromDB.find({ username });
        
        for (const user of existingUsers) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                throw new Error('Password already in use');
            }
        }
        // Validate email
        const isEmailValid = await validateEmail(email);
        if (!isEmailValid) {
            throw new Error('Invalid email address');
        }

        validatePassword(password);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user to the database
        const newUser = new UserFromDB({ username, password: hashedPassword, email, role });
        await newUser.save();
    } catch (err) {
        throw new Error(err.message);
    }
};


const login = async (username, password) => {
    try {
        validatePassword(password);
        
        // מציאת כל המשתמשים עם אותו שם משתמש
        const users = await UserFromDB.find({ username });
        
        // אם לא נמצאו משתמשים עם השם הנתון
        if (users.length === 0) {
            throw new Error('User not found');
        }

        // בדיקת תואמות הסיסמא לכל משתמש בלולאה
        let userFound = false;
        for (const user of users) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                userFound = true;
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET);
                return token;
            }
        }

        // אם לא נמצאה תואמת לסיסמא לאף משתמש
        if (!userFound) {
            throw new Error('Invalid credentials');
        }

    } catch (err) {
        throw new Error(err.message);
    }
};


module.exports = {
    signup,
    login
}

