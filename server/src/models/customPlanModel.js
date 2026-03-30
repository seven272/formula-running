import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

const sessionSchema = new mongoose.Schema(
  {
    day: { type: String, required: true }, // "Пн", "Вт"...
    type: { type: String, required: true }, // "easy", "interval"...
    title: { type: String, required: true },
    descr: { type: String, default: '' },
    km: { type: Number, default: 0 },
    load: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }, // статус выполнения
    completedAt: { type: Date, default: null },
    isStrength: { type: Boolean, default: false },
    strength: {
      title: { type: String, default: 'Силовая.' },
      descr: { type: String, default: 'Посмотреть варианты ОФП.' },
    },
  },
  { _id: true }, // _id поможет нам находить конкретную тренировку для Toggle, создаются для вложенных схем автоматически, добавил для нагляднотси
)

const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  stage: {
    type: String,
    enum: ['base', 'build', 'peak', 'taper'],
    default: 'base',
  },
  isRecovery: { type: Boolean, default: false },
  status: { type: String, default: '' }, // "Пиковая" и т.д.
  weeklyKm: { type: Number, default: 0 },
  sessions: [sessionSchema], // Массив вложенных схем тренировок
})

const customPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // кто создал план id в БД
      ref: 'User',
      default: null, // пока пользователя нет в БД
    },
    ownerVkId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: '',
      trim: true,
      index: true, // индекс для быстрого поиска по названию справочника
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    typeSport: {
      type: String,
      enum: ['run', 'bike', 'swim', 'tri'],
      default: 'run',
    },
    distance: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    period: {
      type: String,
      default: '',
      trim: true,
    },
    planUrl: {
      type: String,
      unique: true,
    },
    pace: {
      type: Object,
      required: true,
    },
    workouts: [weekSchema],
  },
  {
    timestamps: true,
    minimize: false, // Преедохранитель, если данных нет, то сохранит в базу пустой объект
    toJSON: { virtuals: true }, // Чтобы прогресс уходил на фронтенд
    toObject: { virtuals: true },
  },
)

// виртуальный прогресс по количеству тренировок
customPlanSchema.virtual('progress').get(function () {
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
customPlanSchema.virtual('activityMap').get(function () {
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
customPlanSchema.pre('save', function (next) {
  // Генерируем слаг только если заголовок изменился или это новый документ
  if (this.isModified('title') || this.isNew) {
    const baseSlug = slugify(this.title, {
      lower: true, // в нижний регистр
      strict: true, // удалить спецсимволы
      locale: 'ru', // поддержка кириллицы
    })

    // Добавляем короткий хвост из 5 символов для 100% уникальности
    this.planUrl = `${baseSlug}-${nanoid(5)}`
  }
  next()
})

export default mongoose.model('CustomPlan', customPlanSchema)
