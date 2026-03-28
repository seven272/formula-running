import express from 'express'

import {
  register,
  login,
  logout,
  getMe,
  getStatistics,
  createVkToken
} from '../controllers/authController.js'

import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import verifyVkSignature from '../middleware/verifyVkSignature.js'

const router = express.Router()

//роуты авторизации
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/authVk', verifyVkSignature, createVkToken)
router.get('/me', checkAuth, checkAdmin, getMe)
router.get('/statistics', checkAuth, checkAdmin, getStatistics)

export default router
