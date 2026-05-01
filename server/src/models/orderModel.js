import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String}, // ID транзакции от VK
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на наш объект User
    vkId: { type: String, required: true }, // Для удобного поиска
    tierId: { type: String, required: false },
    typeOrder: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['created', 'completed'],
      default: 'created',
    }, //елси оплата прошла успешно - completed, если сбой или отмена пользователем в процесее оплаты то created
    // Поле пригодится, если надо бует логировать активацию
    isUsed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)
