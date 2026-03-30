import mongoose from 'mongoose'

import User from '../models/userModel.js'
import ReadyPlan from '../models/readyPlanModel.js'
import PurchasedPlan from '../models/purchasedPlanModel.js'
import Order from '../models/orderModel.js'

const createProfile = async (req, res) => {
  const { vkId, name, avatarUrl } = req.body
  try {
    // findOneAndUpdate с upsert заменяет всю логику "поиск-проверка-создание"
    const user = await User.findOneAndUpdate(
      { vkId },
      { name, avatarUrl },
      {
        new: true, // Вернуть обновленный документ
        upsert: true, // Создать, если не найден
      },
    )
    res.status(200).json(user)
  } catch (error) {
    console.error('Ошибка createProfile controller:', error)
    res.status(500).json({
      message: 'Ошибка сервера при сохранении профиля',
    })
  }
}

const getMyProfile = async (req, res) => {
  const vkId = req.vkId
  try {
    const user = await User.findOne({ vkId }).lean()

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь еще не зарегистрирован',
      })
    }

    res.status(201).json(user)
  } catch (error) {
    console.error('Ошибка в getMyProfile:', error)
    // Возвращаем 500 статус, чтобы Redux Toolkit ушел в rejected
    res.status(500).json({
      message: 'Ошибка сервера при получении профиля',
    })
  }
}

const updatePersonalParameters = async (req, res) => {
  try {
    const vkId = req.vkId
    const { age, weight, height } = req.body
    const user = await User.findOne({ vkId })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден в БД',
      })
    }

    // 2. Обновляем поля (защита: если значение пришло, обновляем, иначе оставляем старое)
    if (age !== undefined) user.profile.age = Number(age)
    if (weight !== undefined) user.profile.weight = Number(weight)
    if (height !== undefined) user.profile.height = Number(height)

    await user.save()

    res.status(200).json({
      age: user.profile.age,
      weight: user.profile.weight,
      height: user.profile.height,
    })
  } catch (error) {
    console.error(
      'Ошибка updatePersonalParameters controller:',
      error,
    )
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении данных' })
  }
}

const updateRecords = async (req, res) => {
  try {
    const vkId = req.vkId
    const { five, ten, halfmarathon, marathon } = req.body

    const user = await User.findOne({ vkId })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден в базе',
      })
    }

    user.profile.records.five = five
    user.profile.records.ten = ten
    user.profile.records.halfmarathon = halfmarathon
    user.profile.records.marathon = marathon

    await user.save()

    res.status(200).json({
      five: user.profile.records.five,
      ten: user.profile.records.ten,
      halfmarathon: user.profile.records.halfmarathon,
      marathon: user.profile.records.marathon,
    })
  } catch (error) {
    console.error('Ошибка updateRecords controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении данных' })
  }
}

const updateZonesPulse = async (req, res) => {
  try {
    const vkId = req.vkId
    const { zone1, zone2, zone3, zone4, zone5 } = req.body
    const user = await User.findOne({ vkId })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден в базе',
      })
    }

    user.profile.pulses.zone1 = zone1
    user.profile.pulses.zone2 = zone2
    user.profile.pulses.zone3 = zone3
    user.profile.pulses.zone4 = zone4
    user.profile.pulses.zone5 = zone5

    await user.save()

    res.status(200).json({
      zone1: user.profile.pulses.zone1,
      zone2: user.profile.pulses.zone2,
      zone3: user.profile.pulses.zone3,
      zone4: user.profile.pulses.zone4,
      zone5: user.profile.pulses.zone5,
    })
  } catch (error) {
    console.error('Ошибка updateRecords controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении данных' })
  }
}

const updatePace = async (req, res) => {
  try {
    const vkId = req.vkId
    const newPace = req.body.pace
    const user = await User.findOne({ vkId })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден в базе',
      })
    }

    user.profile.pace = newPace
    await user.save()
    res.status(200).json({
      pace: user.profile.pace,
    })
  } catch (error) {
    console.error('Ошибка updatePace controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении темпа' })
  }
}

const getPurchasedPlans = async (req, res) => {
  const vkId = req.vkId
  try {
    const user = await User.findOne({ vkId }).populate(
      'purchasedCopiedPlans',
    )

    if (!user) {
      return res.json({
        message: 'Такого пользователя не существует.',
      })
    }

    res.json({
      purchasedPlans: user.purchasedCopiedPlans,
    })
  } catch (error) {
    console.log('Error getPurchasedPlans controller ' + error)
    res.json({ message: 'Ошибка при получении купленных планов' })
  }
}

const getCurrentPlan = async (req, res) => {
  const vkId = req.vkId
  try {
    const user = await User.findOne({ vkId }).populate('currentPlan')

    if (!user) {
      return res.json({
        message: 'Такого пользователя не существует.',
      })
    }
    if (!user.currentPlan) {
      return res.json({
        message: 'Активного плана нет в БД',
      })
    }
    res.json({
      message: 'Данные с активным планом успешно загружены',
      currentPlan: user.currentPlan,
    })
  } catch (error) {
    res.status(500).json({ message: 'Нет активного плана' })
  }
}

const changeCurrentPlan = async (req, res) => {
  const vkId = req.vkId
  const planId = req.body.planId
  const modelName = req.body.modelName
  try {
    const user = await User.findOne({ vkId })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден в базе.',
      })
    }

    // Проверка прав: куплен ли purchasedCopiedPlans или создан ли CustomPlan
    const isPurchased =
      modelName === 'PurchasedPlan' &&
      user.purchasedCopiedPlans.includes(planId)
    const isCustom =
      modelName === 'CustomPlan' && user.customPlans.includes(planId)

    if (!isPurchased && !isCustom) {
      return res
        .status(403)
        .json({ message: 'Этот план вам недоступен' })
    }

    user.currentPlan = planId
    user.nameModel = modelName
    await user.save()

    // получаю план со всеми данными  перед отправкой
    const populatedUser = await user.populate('currentPlan')

    res.json({
      message: 'План активирован',
      currentPlan: populatedUser.currentPlan,
    })
  } catch (error) {
    console.error('Ошибка changeCurrentPlan controller:', error)
    res.status(500).json({
      message: 'Ошибка сервера при обновлении активного плана',
    })
  }
}

const toggleSessionStatus = async (req, res) => {
  const vkId = req.vkId
  const { weekId, sessionId } = req.body

  try {
    const user = await User.findOne({ vkId })

    if (!user || !user.currentPlan) {
      return res
        .status(404)
        .json({ message: 'Активный план не выбран' })
    }

    // Динамически получаем нужную модель (CustomPlan или PurchasedPlan)
    const PlanModel = mongoose.model(user.nameModel)

    // user.currentPlan — это и есть ID плана (если нет populate)
    const plan = await PlanModel.findById(user.currentPlan)

    // Поиск недели и сессии через встроенный метод .id()
    const week = plan.workouts.find(
      (w) => w._id.toString() === weekId,
    )
    if (!week)
      return res.status(404).json({ message: 'Неделя не найдена' })

    const session = week.sessions.find(
      (s) => s._id.toString() === sessionId,
    )
    if (!session)
      return res
        .status(404)
        .json({ message: 'Тренировка не найдена' })

    // Переключаем статус
    const isNowCompleted = !session.completed

    session.completed = isNowCompleted

    // Логика записи даты:
    if (isNowCompleted) {
      session.completedAt = new Date() // Ставим штамп времени
    } else {
      session.completedAt = null // Очищаем, если галочку сняли
    }
    // для глубокого мониторинга изменений вложенных массивов
    plan.markModified('workouts')
    // Сохраняю изменения
    await plan.save()

    // Возвращаем обновленный прогресс (из нашего Virtual)
    res.status(200).json({
      newStatus: session.completed,
      progress: plan.progress, // { percent, completed, total }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const buyPlan = async (req, res) => {
  try {
    const vkId = req.vkId
    const readyPlanId = req.body.readyPlanId

    // 1. ПРОВЕРКА ОПЛАТЫ
    // Ищем в базе Order запись, которую создал payVk
    const paymentRecord = await Order.findOne({
      vkId: vkId,
      typePlan: 'ready',
      planId: String(readyPlanId), // Ищем именно ID плана, который мы вырезали через split('_')
      status: 'completed',
    })

    // Если записи нет — значит, оплаты не было (или она еще не дошла)
    if (!paymentRecord) {
      return res.status(402).json({
        message:
          'План не оплачен. Пожалуйста, сначала совершите покупку.',
        error_code: 'PAYMENT_REQUIRED',
      })
    }

    const template = await ReadyPlan.findById(readyPlanId)
    const user = await User.findOne({ vkId })
    //проверяю существует или авторизован юзер
    if (!user) {
      return res.status(403).json({
        message: 'Необходимо авторизоваться, чтобы купить план',
      })
    }
    //проверяю есть уже этот план в купленных или нет
    const isPurchased = user.purchasedReadyPlans.includes(readyPlanId)
    //если да, то выкидываю ошибку
    if (isPurchased) {
      return res.status(401).json({
        message: 'Вы купили этот план ранее',
      })
    }

    // Клонирую воркауты с дефолтным статусом false
    const clonedWorkouts = template.workouts.map((week) => ({
      ...week,
      sessions: week.sessions.map((s) => ({
        ...s,
        completed: false,
      })),
    }))

    const personalCopy = await PurchasedPlan.create({
      userId: user._id,
      originalPlanId: readyPlanId,
      ownerVkId: vkId,
      pace: {},
      workouts: clonedWorkouts,
      title: template.title,
      subtitle: template.subtitle,
      typeSport: template.typeSport,
      distance: template.distance,
      period: template.period,
      time: template.time,
      pace: template.pace,
      planUrl: template.planUrl,
      pictureUrl: template.pictureUrl,
      isFree: template.isFree,
    })

    // Обновляем юзера

    user.purchasedCopiedPlans.push(personalCopy._id)
    user.purchasedReadyPlans.push(readyPlanId)
    user.currentPlan = personalCopy._id
    user.nameModel = 'PurchasedPlan'
    await user.save()

    res.status(200).json(personalCopy)
  } catch (error) {
    console.error('Ошибка buyPlan controller:', error)
    res.status(500).json({
      message: 'Ошибка сервера при покупке плана',
    })
  }
}

export {
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
}
