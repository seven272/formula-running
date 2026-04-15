import express from 'express'

import {
payVk,
checkCustomToken,
vkPayFiat
} from '../controllers/orderController.js'


import vkPayMiddleware from '../middleware/vkPayMiddleware.js'
import checkVkId from '../middleware/сheckVkId.js'

const router = express.Router()

//роуты авторизации
router.post('/pay-vk', vkPayMiddleware, payVk)
router.post('/fiat-pay-vk', vkPayFiat)
router.get('/check-token', checkVkId, checkCustomToken)

export default router
