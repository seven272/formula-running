import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB подключена на порту: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Ошибка при подключении к MongoDB: ${error.message}`)
    process.exit(1) //завершаю процесс. код 1 означает ошибку, код 0 успех
  }
}

export { connectDB }
