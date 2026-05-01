import express from 'express'

import {
  createPaymentYooKassa,
  handleWebhookYooKassa,
} from '../controllers/orderController.js'

import vkPayMiddleware from '../middleware/vkPayMiddleware.js'
import vkCheckKeyGroup from '../middleware/vkCheckKeyGroup.js'
import checkVkId from '../middleware/сheckVkId.js'

const router = express.Router()

//роуты оплаты
// router.post('/pay-vk', vkPayMiddleware, payVk)
// router.post('/fiat-pay-vk', vkCheckKeyGroup, vkPayFiat)
// router.get('/check-token', checkVkId, checkCustomToken)
router.post('/create-payment', checkVkId, createPaymentYooKassa)
router.get('/webhook', handleWebhookYooKassa)

export default router
