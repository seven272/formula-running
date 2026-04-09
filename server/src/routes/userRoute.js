import express from 'express'

import {
  createProfile,
  getMyProfile,
  updatePersonalParameters,
  updateRecords,
  updateZonesPulse,
  updatePace,
  buyPlan,
  getPurchasedPlans,
  changeCurrentPlan,
  getCurrentPlan,
  toggleSessionStatus,
  updateWorkoutUser,
  resetProgress,
  updateSessionStatus
} from '../controllers/userController.js'

import checkVkId from '../middleware/сheckVkId.js'
import upload from '../middleware/upload.js'

const router = express.Router()

//роуты редактирования профиля
router.post('/upload/avatar', upload.single('avatar'), (req, res) => {
  res.json({
    message: 'Аватар успешно загружен',
    url: `/uploads/avatars/${req.file.filename}`,
  })
})

router.post('/create-profile', checkVkId, createProfile)
router.get('/get-profile', checkVkId, getMyProfile)
router.put('/personal-param', checkVkId, updatePersonalParameters)
router.put('/records', checkVkId, updateRecords)
router.put('/pulse', checkVkId, updateZonesPulse)
router.put('/pace', checkVkId, updatePace)
router.post('/buy', checkVkId, buyPlan)
router.get('/purchased', checkVkId, getPurchasedPlans)
router.get('/get-current-plan', checkVkId, getCurrentPlan)
router.put('/change-current-plan', checkVkId, changeCurrentPlan)
router.patch('/toggle-session-status', checkVkId, toggleSessionStatus)
router.patch('/update-workout', checkVkId, updateWorkoutUser)
router.patch('/reset-progress-plan', checkVkId, resetProgress)
router.patch('/update-session-status', checkVkId, updateSessionStatus)




export default router
