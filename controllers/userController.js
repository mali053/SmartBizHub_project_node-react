const userService = require('../services/userService')

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUser(id);
        res.send(user);
    } catch (error) {
        console.error(`error in fetch user ${error.message}`);
        res.status(500).send('error in fetch user');
    }
}

const signup = async (req, res) => {
    try {
        const { username, password, phone, email, role } = req.body
        await userService.signup(username, password, phone, email, role)
        res.status(201).send('User saved successfully')
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const token = await userService.login(username, password)
        res.header('auth-token', token).send({ token })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, password, phone, email, role } = req.body
        await userService.update(id, username, password, email, phone, role)
        res.status(201).send('User updated successfully')
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

module.exports = {
    getUser,
    signup,
    login,
    update
}
