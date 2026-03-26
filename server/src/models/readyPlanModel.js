import mongoose from 'mongoose'
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
    completedAt: { type: Date, default: null }
  },
  { _id: true }, // _id поможет нам находить конкретную тренировку для Toggle
)

const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  stage: { type: String, default: 'build' }, // "base", "build", "peak", "taper"
  isRecovery: { type: Boolean, default: false },
  status: { type: String, default: '' }, // "Пиковая" и т.д.
  weeklyKm: { type: Number, default: 0 },
  sessions: [sessionSchema], // Массив вложенных схем тренировок
})

const readyPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: '',
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    typeSport: {
      type: String,
      required: true,
      enum: ['run', 'bike', 'swim', 'tri'],
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
      trim: true,
    },
    pictureUrl: {
      type: String,
      default: '',
    },
     pace: {
      type: Object,
      required: true,
    },
     time: {
      type: Object,
      required: false,
    },
    isFree: {
      type: Boolean,
      default: false,
      required: true,
    },
    workouts: {
      type: [weekSchema],
      trim: true,
    },
  },
  { timestamps: true, minimize: false },
)

//создаю url для плана
readyPlanSchema.pre('save', function (next) {
  // Генерируем слаг только если заголовок изменился или это новый документ
  if (this.isModified('title') || this.isNew) {
    const baseSlug = slugify(this.title, {
      lower: true, // в нижний регистр
      strict: true, // удалить спецсимволы
      locale: 'ru', // поддержка кириллицы
    })

    this.planUrl = `${baseSlug}`
  }
  next()
})

export default mongoose.model('ReadyPlan', readyPlanSchema)
