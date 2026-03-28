import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Auth from '../models/authModel.js'
import User from '../models/userModel.js'
import PurchasedPlan from '../models/purchasedPlanModel.js'
import CustomPlan from '../models/customPlanModel.js'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const REGISTER_CODE = process.env.REGISTRATION_CODE

const register = async (req, res) => {
  try {
    const { username, password, code } = req.body

    // Проверяем соответствие кода
    if (code !== REGISTER_CODE) {
      return res.status(403).json({
        message: 'Регистрация отклонена. Неверный код',
      })
    }

    //проверяю нет ли уже такого никнейма
    const isUsed = await Auth.findOne({ username })
    if (isUsed) {
      return res
        .status(401)
        .json({ message: 'данный никнейм уже занят' })
    }
    // шифрую пароль
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const newUser = new Auth({
      username,
      password: hashPassword,
      isAdmin: false,
    })

    //создаю токен для проверки при авторизации: 1 - данные которые шифруются, 2- секретная фраза, 3 - срок жизни токена
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    )

    //сохраняю пользователя в базу данных
    await newUser.save()

    //возвращаю ответ
    res.status(201).json({
      user: newUser,
      token,
      message: 'Регистрация прошла успешно',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ошибка сервера при регистрации пользователя',
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await Auth.findOne({ username })

    if (!user) {
      return res.status(401).json({
        message: 'Такого юзера не существует.',
      })
    }
    // сравниваю пароль из запроса(обычный) и хэшированный пароль, хранящийся в БД
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Неверный логин или пароль.',
      })
    }
    //создаю токен с ИД юзера
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    )

    res.status(201).json({
      token,
      user,
      message: 'Вы вошли в систему',
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка сервера при авторизации' })
  }
}

const logout = async (req, res) => {
  //удаляю куки и отправляю сообщение о деавторизации
  res.clearCookie('jwt-sportplans')
  res
    .status(201)
    .json({ message: 'Выход из аккуанта выполнен успешно' })
}

const getMe = async (req, res) => {
  try {
    const user = await Auth.findById(req.userId)

    if (!user) {
      return res.json({
        message: 'Такого пользователя не существует.',
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    )

    res.json({
      message: 'Данные о авторизации получены',
      user,
      token,
    })
  } catch (error) {
    res.status(403).json({ message: 'Нет доступа' })
  }
}

const getStatistics = async (req, res) => {
  try {
    const users = await User.find({})
    const purchasedPlans = await PurchasedPlan.find({})
    const generatedPlans = await CustomPlan.find({})

    res.status(200).json({
      users,
      purchasedPlans,
      generatedPlans,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка сервера при получении статистикки' })
  }
}

const createVkToken = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        vkId: req.vkId,
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    )

    res.status(201).json({
      token: token,
    })
  } catch (error) {
    res.status(403).json({ message: 'Нет доступа' })
  }
}

export {
  getMe,
  login,
  register,
  logout,
  getStatistics,
  createVkToken,
}
