import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import { connectDB } from './config/db.js'
import corsOptions from './config/corsOptions.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import readyPlanRoute from './routes/readyPlanRoute.js'
import customPlanRoute from './routes/customPlanRoute.js'
import orderRoute from './routes/orderRoute.js'


//создаю приложение
const app = express()
//чтобы считывать переменные среды
dotenv.config()

//определяю порт
const PORT = process.env.PORT || 5010
//текущая папка
const __dirname = import.meta.dirname

//Middlewares
//разрешаю запросы к серверу с других ip адресов CORS POLICY
app.use(cors(corsOptions))
//создаю мидлвар для того чтобы сервер понимал формат json
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //чтобы парсить вложенные данные(например обьекты) передаваемые в req.body

//Мидлвар для изображений. При попытке загрузить изображение сервер отправляет get запрос на получение  изображения http://localhost:5000/static/name-folder/name-image.jpg, и я отправляю сервер искать в папку с изображениями uploads, чтобы проверить есть ли там файл с таким именем.
app.use('/static', express.static(path.join(__dirname + '/uploads')))

//подключаю группу роутов для регистрации пользователя
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/plans', readyPlanRoute)
app.use('/api/custom-plans', customPlanRoute)
app.use('/api/orders', orderRoute)


// Запускаем сервер
const start = async () => { 
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Сервер успешно запущен на порту ${PORT}`)
    })
  } catch (error) {
    console.log(`Ошибка при подкючении с серверу ` + error)
  }
}

start()
