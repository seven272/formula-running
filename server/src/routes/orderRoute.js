import express from 'express'

import {
payVk
} from '../controllers/orderController.js'


import vkPayMiddleware from '../middleware/vkPayMiddleware.js'

const router = express.Router()

//роуты авторизации
router.post('/pay-vk', vkPayMiddleware, payVk)

export default router
