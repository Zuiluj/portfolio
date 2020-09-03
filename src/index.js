import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import compression from 'compression';

import { connect } from './utils/db.js'
import { pubBlogRouter, authBlogRouter, authUploadRouter, pubTagRouter, authTagRouter } from './resources/blog/blog.router'
import adminRouter from './resources/admin/admin.router'
import sendMailRouter from './resources/mail/mail.router'
import { createAdmin, checkAdmin, logoutAdmin, authRequired, generateSecretKey, keyRequired } from './utils/auth'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000


const corsConfig = {
    origin: true,
    credentials: true,
}

// Middlewares
app.use(cookieParser())
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.json())

// Public Admin endpoint
app.use('/api/login', checkAdmin)

// Emailing endpoint
app.use('/api/send_mail', sendMailRouter)

// check if end has api key
app.use('/api/signup', keyRequired, createAdmin)

// Public Blog Endpoints
app.use('/api/blogs', pubBlogRouter)
app.use('/api/blogs/tags', pubTagRouter)

// Authenticated endpoints
app.use('/api/auth', authRequired) // Need authentication past this endpoint
app.use('/api/auth/blogs', authBlogRouter)
app.use('/api/auth/blogs/tags', authTagRouter)
app.use('/api/auth/photos', authUploadRouter)
app.use('/api/auth/admin', adminRouter)
app.use('/api/auth/newKey', generateSecretKey)
app.use('/api/auth/logout', logoutAdmin)

// Start function
const start = async () => {
    try {
        // await mongodb connection first
        await connect()
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`)
        })
    } catch(err) {
        console.error(err);
    }
}

// Start server
start()