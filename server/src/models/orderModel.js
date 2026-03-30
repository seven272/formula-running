import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // ID транзакции от VK
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на наш объект User
    vkId: { type: String, required: true }, // Для удобного поиска
    planId: { type: String, required: true }, // 'ready_plan' или 'custom_plan'
    typePlan: {
      type: String,
      enum: ['ready', 'custom'],
      default: 'ready',
    },
    status: {
      type: String,
      enum: ['created', 'completed'],
      default: 'created',
    }, //елси оплата прошла успешно - completed, если сбой или отмена пользователем в процесее оплаты то created
     isUsed: {
      type: Boolean,
      default: false,
    }, //чек дающий право на генерацию плана, нужен только для кастомных планов
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)
