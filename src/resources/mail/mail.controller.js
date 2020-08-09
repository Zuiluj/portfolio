import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { google } from 'googleapis'
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env'})

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const Mailing = {};

const oauth2Client = new OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.MAILING_SERVICE_CLIENT_ID,
        clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: process.env.MAILING_SERVICE_CLIENT_ACCESS_TOKEN,
        expires: 1484314697598
    }
});

transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
});


export const sendMail = async function(req, res) {
    try {
        let name = req.body.name
        let email = req.body.email
        let message = req.body.message
        let content = `Name: ${name}\n Email: ${email} \nMessage: ${message}`
        
        let mail = {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Work from Web Dev',
            text: content,
        }

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({
                    status: 'fail'
                })
            } else {
                res.json({
                    status: 'success'
                })
            }
        })

    } catch (err) {
        console.error(err)
        res.status(400).send(JSON.stringify(err))
    }
}