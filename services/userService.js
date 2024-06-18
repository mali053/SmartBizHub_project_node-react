const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserToDB = require('../models/user')
const { validatePassword } = require('./validateService');

const getUser = async (id) => {
    return await UserToDB.findById(id)
}

const signup = async (user) => {
    try {        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Save new user to the database
        const newUser = new UserToDB({ username: user.username, password: hashedPassword, phone: user.phone, email: user.email, userType: user.userType });
        await newUser.save();
    } catch (err) {
        throw new Error(err.message);
    }
};


const login = async (username, password) => {
    try {
        validatePassword(password);

        // מציאת כל המשתמשים עם אותו שם משתמש
        const users = await UserToDB.find({ username });

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

const update = async (id, user) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword
        
        const userToUpdate = await UserToDB.findByIdAndUpdate(id, user, { new: true });
        if (!userToUpdate) {
            throw new Error('User not found');
        }

        return userToUpdate;
    } catch (error) {
        throw new Error(error.message);
    }

}


module.exports = {
    getUser,
    signup,
    login,
    update
}

