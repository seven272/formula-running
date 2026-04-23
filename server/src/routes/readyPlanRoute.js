import express from 'express'

import {
  createPlan,
  getAllPlans,
  deletePlan,
  updatePlan,
  getFreePlans, 
  downloadPlan,
  getPaidPlans
} from '../controllers/readyPlanController.js'

import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import upload from '../middleware/upload.js'

const router = express.Router()

//роут загрузки изображения для плана
router.post(
  '/upload/picture',
  upload.single('picture'),
  (req, res) => {
    res.json({
      message: 'Изображение успешно загружено',
      url: `static/pictures/${req.file.filename}`,
    })
  }
)

//роут загрузки pdf файла плана
router.post('/upload/plan', upload.single('plan'), (req, res) => {
  res.json({
    message: 'Изображение успешно загружено',
    url: `src/uploads/plans/${req.file.filename}`,
  })
})

router.post('/create', checkAuth, checkAdmin, createPlan)
router.get('/all', getAllPlans)
router.get('/free', getFreePlans)
router.get('/paid', getPaidPlans)
router.delete('/delete/:id', checkAuth, checkAdmin, deletePlan)
router.put('/update/:id', checkAuth, checkAdmin, updatePlan)
router.get('/download/:id', checkAuth, checkAdmin, downloadPlan)

export default router
