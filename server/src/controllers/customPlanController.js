import CustomPlan from '../models/customPlanModel.js'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import { generateRunningPlan } from '../utils/planGenerator.js'

const createCustomPlan = async (req, res) => {
  const vkId = req.vkId
  const dataPlan = req.body

  try {
    if (!dataPlan.goal || !dataPlan.totalWeeks || !dataPlan.time) {
      return res.status(400).json({
        message: 'Недостаточно данных для генерации плана',
      })
    }

    // Ищем неиспользованный оплаченный чек для кастомного плана
    const activeToken = await Order.findOne({
      vkId: String(vkId),
      typePlan: 'custom',
      status: 'completed',
      isUsed: false,
    })

    // Проверяем, генерировал ли пользователь планы когда-либо
    const hasAnyPlan = await CustomPlan.exists({ ownerVkId: vkId })

    if (!activeToken && hasAnyPlan) {
      return res
        .status(402)
        .json({ message: 'Вначале следует оплатить создание плана' })
    }

    // Находим или создаем пользователя (используем upsert для сокращения кода)
    // Если пользователь НАЙДЕН: MongoDB просто возвращает его. Блок $setOnInsert игнорируется. Это защищает от случайной перезаписи данных существующего юзера.
    // Если пользователь НЕ найден: Создается новый документ. В него записывается 'vkId' из блока $setOnInsert (и любые другие поля, которые там указать, например balance: 0 или createdAt).
    let user = await User.findOneAndUpdate(
      { vkId },
      { $setOnInsert: { vkId } },
      { upsert: true, new: true },
    )

    const generatedPlan = generateRunningPlan(dataPlan)

    // создаю план
    const newPlan = await CustomPlan.create({
      userId: user._id,
      ownerVkId: vkId,
      title: generatedPlan.title,
      typeSport: generatedPlan.typeSport,
      distance: generatedPlan.distance,
      period: generatedPlan.period,
      pace: generatedPlan.pace,
      isFree: !hasAnyPlan,
      workouts: generatedPlan.workouts,
    })

    // Привязываем план к пользователю (пушим в локальный объект и сохраняем)
    user.customPlans.push(newPlan._id)
    user.currentPlan = newPlan._id // Устанавливаем ID
    user.nameModel = 'CustomPlan' // Указываем модель для refPath
    await user.save()
    // погашаем токен: теперь этот чек больше нельзя использовать
    activeToken.isUsed = true
    activeToken.planId = newPlan._id
    await activeToken.save()

    res.status(201).json(newPlan)
  } catch (error) {
    console.error('Ошибка createCustomPlan controller:', error)

    // Если ошибка валидации Mongoose (например, неверный тип данных)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({
      message: 'Ошибка сервера при создании кастомного плана',
    })
  }
}

const getAllCustomPlans = async (req, res) => {
  try {
    const plans = await planModel.find({})
    return res.status(201).json({
      message: 'планы успешно получены',
      count: plans.length,
      plans,
    })
  } catch (error) {
    console.error('Ошибка getAllCustomPlans controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при получении списка планов' })
  }
}

const getUserCustomPlans = async (req, res) => {
  const vkId = req.vkId

  try {
    const plans = await CustomPlan.find({ ownerVkId: vkId }).sort({
      createdAt: -1,
    })
    return res.status(201).json(plans)
  } catch (error) {
    console.error('Ошибка getUserCustomPlans controller:', error)
    res.status(500).json({
      message:
        'Ошибка сервера при получении списка персональных планов пользователя',
    })
  }
}

const deleteCustomPlan = async (req, res) => {
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
    console.error('Ошибка deleteCustomPlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при удалении плана' })
  }
}

const updateCustomPlan = async (req, res) => {
  const id = req.params.id
  const plan = req.body

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
    console.error('Ошибка updateCustomPlan controller:', error)
    res
      .status(500)
      .json({ message: 'Ошибка сервера при обновлении плана' })
  }
}

export {
  createCustomPlan,
  getUserCustomPlans,
  getAllCustomPlans,
  deleteCustomPlan,
  updateCustomPlan,
}
