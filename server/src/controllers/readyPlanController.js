import planModel from '../models/readyPlanModel.js'
import userModel from '../models/userModel.js'

import fs from 'fs'

const createPlan = async (req, res) => {
  const {
    title,
    subtitle,
    typeSport,
    distance,
    period,
    planUrl,
    pictureUrl,
    time,
    pace,
    isFree,
    workouts,
  } = req.body

  try {
    const newPlan = new planModel({
      title,
      subtitle,
      typeSport,
      distance,
      period,
      planUrl,
      pictureUrl,
      time,
      pace,
      isFree,
      workouts:
        typeof workouts === 'string'
          ? JSON.parse(workouts)
          : workouts,
    })

    await newPlan.save()

    res.json({
      plan: newPlan,
      message: 'План создан успешно',
    })
  } catch (error) {
    console.error('Ошибка createPlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при создании плана' })
  }
}

const getAllPlans = async (req, res) => {
  try {
    const plans = await planModel.find({})
    return res.status(201).json({
      message: 'планы успешно получены',
      count: plans.length,
      plans,
    })
  } catch (error) {
    console.error('Ошибка getAllPlans controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при получении списка планов' })
  }
}

const getFreePlans = async (req, res) => {
  try {
    const plans = await planModel.find({ isFree: 1 })
    return res.status(201).json({
      message: 'планы успешно получены',
      count: plans.length,
      plans,
    })
  } catch (error) {
    console.error('Ошибка getFreePlans controller:', error)
    res.status(500).json({
      message:
        'Ошибка сервера при получении списка бесплатных планов',
    })
  }
}

const getPaidPlans = async (req, res) => {
  try {
    const plans = await planModel.find({ isFree: 0 })
    return res.status(201).json({
      message: 'планы успешно получены',
      count: plans.length,
      plans,
    })
  } catch (error) {
    console.error('Ошибка getPaidPlans controller:', error)
    res.status(500).json({
      message:
        'Ошибка сервера при получении списка платных планов',
    })
  }
}

const deletePlan = async (req, res) => {
  const id = req.params.id
  try {
    const deletedPlan = await planModel.findByIdAndDelete(id)

    if (!deletedPlan) {
      return res.status(404).json({
        message: 'план не найден',
      })
    }

    return res.status(200).json({
      message: 'План успешно удален',
      deletedPlan,
    })
  } catch (error) {
    console.error('Ошибка deletePlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при удалении плана' })
  }
}

const updatePlan = async (req, res) => {
  const id = req.params.id
  const plan = req.body

  // Если пришла строка из textarea, парсим её
  plan.workouts =
    typeof plan.workouts === 'string'
      ? JSON.parse(plan.workouts)
      : plan.workouts

  // plan.workouts = JSON.parse(plan.workouts)

  try {
    const updatedPlan = await planModel.findByIdAndUpdate(id, plan, {
      new: true,
    })
    if (!updatedPlan) {
      return res.status(404).json({
        message: 'план не найден',
      })
    }
    return res.status(201).json({
      message: 'данные плана обновлены',
      updatedPlan,
    })
  } catch (error) {
    console.error('Ошибка updatePlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении плана' })
  }
}

const downloadPlan = async (req, res) => {
  //`http://localhost:5000/uploads/plans/1760027980283-933324743-Ironman-build-phase-training-plan-f4d30cf.pdf'

  const planId = req.params.id
  const userId = req.userId

  try {
    const localPath = '/home/mike/VK_apps/vk-run-plans/server'
    const plan = await planModel.findById(planId)
    const user = await userModel.findById(userId)
    const planPath = localPath + plan.planUrl

    if (fs.existsSync(planPath)) {
      return res.download(planPath)
    }
    return res.status(400).json({ message: 'Download error' })
  } catch (error) {
    console.error('Ошибка downloadPlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при скачивании плана' })
  }
}

export {
  createPlan,
  getAllPlans,
  deletePlan,
  updatePlan,
  getFreePlans,
  downloadPlan,
  getPaidPlans
}
