const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookie = require('cookie-parser')
const prisma = require('./config/prismaClient')

const authRoutes = require('./routes/authRoutes')
const profileRoutes = require("./routes/profileRoutes")

const app = express()

require('dotenv').config({
    path: '/Users/chaitanyasingh/Documents/Project/13/backend/.env' //configure to your .env file path
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookie())

app.use('/api/auth', authRoutes)
app.use("/api/profile", profileRoutes)

prisma.$connect()
    .then(() => {
        console.log('Prisma Client is connected to the database')
    })
    .catch((e) => {
        console.log('Error connecting to the databse', e)
    })

app.get('/', (req, res) => {
    res.send('Serveer is running and Prisma is connected')
})

const PORT = process.env.PORT || 3876

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
