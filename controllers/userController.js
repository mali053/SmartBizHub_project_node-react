const userService = require('../services/userService')

const signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body
    await userService.signup(username, password, email, role)
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

module.exports = {
  signup,
  login
}
