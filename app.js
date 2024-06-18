process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit');
const connectToDatabase = require('./services/dbService')
const userRoute = require('./routes/userRoute')
const {loggedIn} = require('./middleware/authMiddleware')
const businessRoute = require('./routes/businessRoute');
const port = process.env.PORT

const app = express()

connectToDatabase().catch((err) => console.log(err))

// Rate Limiter middleware
const loginLimiter = rateLimit({
    windowMs:  2 * 60 * 1000, // 2 minutes
    max: 10, // Limit each IP to 10 login attempts per windowMs
    message: 'Too many login attempts, please try again more 2 secondes.'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Apply the rate limiter to login route
app.use('/user/login', loginLimiter);

app.use('/user', userRoute)
app.use(loggedIn)
app.use('/business', businessRoute)

app.use((err, req, res, next) => {
  res.status(500).send('יש בעיה בשרת כרגע נסה שוב מאוחר יותר ' + err.message)
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
