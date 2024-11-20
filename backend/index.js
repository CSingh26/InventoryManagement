const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookie = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const prisma = require('./config/prismaClient')

const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')

const app = express()

// Validate environment variables
require('dotenv').config({
    path: '/Users/chaitanyasingh/Documents/Project/13/backend/.env' // Update your .env path
})

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    console.error('Missing required environment variables')
    process.exit(1)
}

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookie())
app.use(morgan('dev')) 
app.use(helmet()) 

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)

// Root endpoint
app.get('/', (req, res) => {
    res.send('Server is running and Prisma is connected')
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK')
})

// Prisma connection
prisma.$connect()
    .then(() => {
        console.log('Prisma Client is connected to the database')
    })
    .catch((e) => {
        console.error('Error connecting to the database:', e)
        process.exit(1)
    })

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    })
})

// Server listening
const PORT = process.env.PORT || 3876

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// Handle Prisma disconnection on exit
process.on('SIGINT', async () => {
    await prisma.$disconnect()
    console.log('Prisma disconnected')
    process.exit(0)
})