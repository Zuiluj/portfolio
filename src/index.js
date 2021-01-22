import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import compression from 'compression'

import { connect } from './utils/db.js'
import { pubBlogRouter, authBlogRouter, authUploadRouter, pubTagRouter, authTagRouter } from './resources/blog/blog.router'
import adminRouter from './resources/admin/admin.router'
import sendMailRouter from './resources/mail/mail.router'
import { createAdmin, checkAdmin, logoutAdmin, authRequired, generateSecretKey, keyRequired } from './utils/auth'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000

const whitelist = process.env.ALLOWED_ORIGINS.split(' ')
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credentials: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false, credentials: true } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

// Middlewares
app.use(compression({
    level: 9
}))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.options('*', cors())

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

app.use(express.static('client/public'))

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
    });   

// // Serve static files from build
// app.use(express.static('client/public'))

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
export { app };
start()