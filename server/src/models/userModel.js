import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    vkId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    hasSportProfile: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'имя',
    },
    avatarUrl: String,
    profile: {
      age: {
        type: Number,
        default: 0,
        required: false,
      },
      height: {
        type: Number,
        default: 0,
        required: false,
      },
      weight: {
        type: Number,
        default: 0,
        required: false,
      },
      records: {
        five: {
          type: String,
          default: '00ч 00мин 00сек',
        },
        ten: {
          type: String,
          default: '00ч 00мин 00сек',
        },
        halfmarathon: {
          type: String,
          default: '00ч 00мин 00сек',
        },
        marathon: {
          type: String,
          default: '00ч 00мин 00сек',
        },
      },
      pulses: {
        zone1: {
          type: String,
          default: '000-000',
        },
        zone2: {
          type: String,
          default: '000-000',
        },
        zone3: {
          type: String,
          default: '000-000',
        },
        zone4: {
          type: String,
          default: '000-000',
        },
        zone5: {
          type: String,
          default: '000-000',
        },
      },
      pace: {
        type: String,
        default: '00:00 | 00:00',
      },
    },
    //купленные планы
    purchasedReadyPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReadyPlan',
      },
    ],
    //копии купленных планов,
    purchasedCopiedPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchasedPlan',
      },
    ],
    //сгенерированные планы
    customPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomPlan',
      },
    ],
    currentPlan: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'nameModel', //казываею путь к полю с названием модели
    },
    // Поле, которое говорит Mongoose, в какой коллекции искать ID
    nameModel: {
      type: String,
      required: false,
      enum: ['CustomPlan', 'PurchasedPlan'], // Названия  моделей
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', userSchema)
