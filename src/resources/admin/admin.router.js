import { Router } from 'express'
import { updateAdmin } from './admin.controller'

const router = Router()

router
    .route('/')
    .put(updateAdmin)

export default router