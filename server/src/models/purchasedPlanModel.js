import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const purchasedPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    originalPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReadyPlan',
    }, // Ссылка на оригинал
    ownerVkId: { type: String, required: true },
    title: String,
    subtitle: String,
    typeSport: String,
    distance: String,
    period: String,
    planUrl: {
      type: String,
      unique: true,
      trim: true,
    },
    pictureUrl: String,
    isFree: {
      type: Boolean,
    },
    pace: {
      type: Object,
      required: false,
    },
    workouts: { type: Array, default: [] }, // Сюда копируем всё с completed: false
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Чтобы прогресс уходил на фронтенд
    toObject: { virtuals: true },
  },
)


// виртуальный прогресс по количеству тренировок
purchasedPlanSchema.virtual('progress').get(function () {
  let total = 0
  let completed = 0

  this.workouts.forEach((week) => {
    week.sessions.forEach((session) => {
      // Считаем все тренировки, кроме дней отдыха (rest)
      if (session.type !== 'rest') {
        total++
        if (session.completed) completed++
      }
    })
  })

  return {
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    completed,
    total,
  }
})

// массив с датами выполненных тренировок
purchasedPlanSchema.virtual('activityMap').get(function () {
  const dates = []
  this.workouts.forEach((week) => {
    week.sessions.forEach((session) => {
      if (session.completed && session.completedAt) {
        // Получаем чистую дату YYYY-MM-DD
        const dateStr = session.completedAt
          .toISOString()
          .split('T')[0]

        // ПРОВЕРКА: если такой даты еще нет в массиве — добавляем
        if (!dates.includes(dateStr)) {
          dates.push(dateStr)
        }
      }
    })
  })
  return dates // Вернет ['2023-10-01', '2023-10-03', ...]
})

//создаю url для плана
purchasedPlanSchema.pre('save', function (next) {
  // генерирую уникальный URL
  // Выполняем генерацию только если это новый документ
  // или если planUrl еще не заполнен
  if (this.isNew || !this.planUrl) {
    const baseUrl = this.planUrl || 'plan'; // Запасной вариант, если planUrl пустой
    this.planUrl = `${baseUrl}-${this.ownerVkId}-${nanoid(5)}`;
  }
})

export default mongoose.model('PurchasedPlan', purchasedPlanSchema)
