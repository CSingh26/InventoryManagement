const enc = require('bcryptjs')
const prisma = require('../config/primsaClient')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

//signup
exports.signup = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const emailExists = await prisma.user.findUnique({
            where: { email },
        })
        if (emailExists) {
            return res.status(400).json({
                error: "Email is already taken. Please use a different email!"
            })
        }

        const userExists = await prisma.user.findUnique({
            where: { username },
        })
        if (userExists) {
            return res.status(400).json({
                error: "Username is already taken. Please use a different username!"
            })
        }

        const hashedPwd = await enc.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email, 
                password: hashedPwd,
                username
            }
        })

        res.status(201).json({
            message: 'User created successfully'
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Error during signup'
        })
    }
}

//login
exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const isPwdValid = await enc.compare(password, user.password)

        if (!isPwdValid) {
            return res.status(401).json({
                error: 'Invalid Password'
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        res.status(200).json({
            message: 'Login Successfull',
            token
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: 'Error during login'
        })
    }
}