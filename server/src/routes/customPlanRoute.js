import express from 'express'

import {
  createCustomPlan,
  getUserCustomPlans,
  getAllCustomPlans,
  deleteCustomPlan,
  updateCustomPlan,
} from '../controllers/customPlanController.js'

import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import checkVkId from '../middleware/сheckVkId.js'


const router = express.Router()


router.post('/create', checkVkId, createCustomPlan)
router.get('/userplans', checkVkId, getUserCustomPlans)
router.get('/all', checkAuth, checkAdmin, getAllCustomPlans)
router.delete('/delete/:id', checkAuth, checkAdmin, deleteCustomPlan)
router.patch('/update/:id', checkAuth, checkAdmin, updateCustomPlan)


export default router