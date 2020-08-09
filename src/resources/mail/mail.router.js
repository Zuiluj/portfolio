import { Router } from 'express'
import { sendMail } from './mail.controller'

const sendMailRouter = Router()

sendMailRouter
    .route('/')
    .post(sendMail)

export default sendMailRouter