// auth.js - Middlewares/Functions that deals with authentication
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { Admin } from '../resources/admin/admin.model'
import { apiKey } from '../resources/key/key.model'

dotenv.config({ path: './src/.env'})
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXP = process.env.JWT_EXP

// Tokens
export const newToken = admin => {
    // Encode the admin's id as a JWT
    return jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
        expiresIn: JWT_EXP
    })
}

export const verifyToken = token => {
    // Decode the JWT 
    // (after calling this) and see if it matches the current admin's ID
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })
}

// CreateAdmin that also creates JWT
export const createAdmin = async function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'username or password required'})
    }

    try {
        const admin = await Admin.create(req.body)
        return res.status(201).send({ message: 'Account created' }) 
    } catch (err) {
        console.error(err)
        return res.status(500).end()
    }
}

// Check admin credentials and send JWT
export const checkAdmin = async function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'Username and Password required' })
    }

    try {
        const admin = await Admin
            .findOne({ username: req.body.username })
            .select('username password') //include username and password
            .exec()

        if (!admin) {
            return res.status(401).send({ message: 'No user found with associated username'})
        }

        const match = await admin.checkPassword(req.body.password)

        if (!match) {
            return res.status(401).send({ message: 'Invalid password' })
        }

        // Send JWT
        const token = newToken(admin)

        res.cookie('token', token, {
            expires: new Date(Date.now() + JWT_EXP),
            secure: false, // set to True when you are using https
            httpOnly: true, // turn true to not be accessed by js
            sameSite: true
        })

        // SPA cookie for react router
        res.cookie('isAuthenticated', true, {
            expires: new Date(Date.now() + JWT_EXP),
            secure: false, 
            httpOnly: false, 
            sameSite: true
        })
        
        return res.status(200).send({ token })
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const logoutAdmin = async function(req, res) {
    try {
        res.clearCookie('token')
        res.clearCookie('isAuthenticated')
        
        return res.status(200).send({ message: 'success' })
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err })
    }
}


// Middleware to check JWT
export const authRequired = async function(req, res, next) {
    
    let token = ''
    if (req.headers.authorization) {
        const bearer = req.headers.authorization
        token = bearer.split('Bearer ')[1].trim()
    } else {
        token = req.cookies.token
    }

    if (!token) {
        return res.status(400).send({ message: "no auth" })
    }

    try {
        // Decode the jwt
        var decodedToken = await verifyToken(token)
    } catch(err) {
        console.error(err)
        return res.status(400).send({ message: err })
    }

    // Use the decoded JWT (now an admin's ID) and 
    // query if such admin exist
    const admin = await Admin.findById(decodedToken.id)
        .select('-password') // exclude password
        .lean()
        .exec()

    if (!admin) {
        return res.status(401).send({ message: "invalid user" })
    }

    req.user = admin
    next()
}


// API SECRET KEY
export const generateSecretKey = async function(req, res) {
    try {
        const newKey = crypto.randomBytes(30).toString('base64')
        const hashedKey = await apiKey.create({ key: newKey })
        res.status(201).json({ data: newKey })
    } catch(err) {
        console.error(err)
        return res.status(500).end()
    }
}

// Middleware to check if the end who is trying to signup has the key
export const keyRequired = async function(req, res, next) {
    const bearer = req.headers.authorization

    try {
        // acquire actual key
        if (!bearer || !bearer.startsWith('Secret')) {
            return res.status(401).send({message: 'no auth headers'})
        }
        
        const reqKey = bearer.split('Secret ')[1].trim()

        const keys = await apiKey
            .find()
            .exec()
       
        // Iterate over the keys and see if the provided 
        //secret is valid
        for (let doc of keys) {
            let compare = await doc.checkKey(reqKey)
            if (compare) var key = doc
        }

        if (!key) {
            return res.status(400).send({ message: 'Invalid auth secret'})
        }
    } catch(err) {
        console.error(err)
        return res.status(400).end()
    }

    next()
}