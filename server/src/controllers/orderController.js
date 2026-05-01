import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import CustomPlan from '../models/customPlanModel.js'

const YOOKASSA_API_URL = 'https://api.yookassa.ru/v3/payments'

const TIER_SETTINGS = {
  athlete: { custom: 3, ready: 3, price: '10.00', title: 'Атлет' },
  pro: { custom: 10, ready: 5, price: '15.00', title: 'Профи' },
  champion: {
    custom: 15,
    ready: 10,
    price: '25.00',
    title: 'Чемпион',
  },
}

// const ITEMS_STORE = {
//   tier_athlete: {
//     title: 'Статус: Атлет',
//     price: 3,
//     customLimit: 3,
//     readyLimit: 3,
//     photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
//   },
//   tier_pro: {
//     title: 'Статус: Профи',
//     price: 7,
//     customLimit: 10,
//     readyLimit: 5,
//     photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
//   },
//   tier_champion: {
//     title: 'Статус: Чемпион',
//     price: 12,
//     customLimit: 15,
//     readyLimit: 10,
//     photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
//   },
// }

const payVk = async (req, res) => {
  const { notification_type, item, user_id, order_id, status } =
    req.body

  try {
    // ЗАПРОС ИНФОРМАЦИИ О ТОВАРЕ
    if (
      notification_type === 'get_item' ||
      notification_type === 'get_item_test'
    ) {
      const product = ITEMS_STORE[item]

      if (!product) {
        // Формат ошибки по документации VK
        return res.json({
          error: { error_code: 20, error_msg: 'Товар не найден' },
        })
      }

      return res.json({
        response: {
          item_id: item,
          title: product.title,
          price: product.price,
          photo_url: product.photo_url,
        },
      })
    }

    // после оплаты
    if (
      (notification_type === 'order_status_change' ||
        notification_type === 'order_status_change_test') &&
      status === 'chargeable'
    ) {
      const vkOrderId = String(order_id)
      const vkId = String(user_id)

      const product = ITEMS_STORE[item]
      if (!product)
        return res.json({
          error: {
            error_code: 20,
            error_msg: 'Данные тира не найдены',
          },
        })
      const newTier = item.replace('tier_', '')

      //Проверка на дубликаты заказов. Проверяем, не обрабатывали ли мы этот order_id ранее
      const existing = await Order.findOne({ orderId: vkOrderId })
      if (existing) {
        return res.json({
          response: {
            order_id: vkOrderId,
            app_order_id: existing._id,
          },
        })
      }

      // Проверка на уже созданного пользователя
      // 2. Создаем или находим пользователя (без выдачи плана)
      const user = await User.findOneAndUpdate(
        { vkId: vkId },
        {
          $set: {
            tier: newTier,
            customPlansLimit: product.customLimit,
            readyPlansLimit: product.readyLimit,
          },
        },
        { upsert: true, new: true },
      )

      // 3. Создаем запись о покупке
      // Именно наличие этого Order будет основанием для выдачи плана в другом контроллере
      const newOrder = await Order.create({
        orderId: vkOrderId,
        userId: user._id, // Привязываем к внутреннему ID пользователя
        vkId: vkId,
        typeOrder: 'tier_upgrade',
        tierId: item,
        status: 'completed',
      })
      // 4. Отвечаем VK. VK ожидает id заказа в системе (app_order_id)
      return res.json({
        response: {
          order_id: vkOrderId,
          app_order_id: String(newOrder._id),
        },
      })
    }

    // На все остальные типы уведомлений (например, критические ошибки платежа)
    res.json({ response: 'ok' })
  } catch (error) {
    console.error('Ошибка в обработке платежа:', error)
    // Возвращаем ошибку в формате VK
    return res.json({
      error: {
        error_code: 1,
        error_msg: 'Внутренняя ошибка сервера',
      },
    })
  }
}
const checkCustomToken = async (req, res) => {
  const vkId = String(req.vkId)

  try {
    if (!vkId) {
      return res
        .status(401)
        .json({ error: 'Необходима авторизация ВК' })
    }
    // Проверяем, генерировал ли пользователь планы когда-либо
    const hasAnyPlan = await CustomPlan.exists({ ownerVkId: vkId })

    // Если планов еще нет — это первая (бесплатная) генерация
    if (!hasAnyPlan) {
      return res.json({ hasToken: true, isFree: true })
    }
    // Ищем хотя бы один неиспользованный оплаченный кастомный план
    const activeOrder = await Order.exists({
      vkId,
      typePlan: 'custom',
      status: 'completed',
      isUsed: false,
    })

    res.json({ hasToken: !!activeOrder, isFree: false }) // !!activeOrder возвращает true или false если объект или underfine/null
  } catch (error) {
    res.status(500).json({ message: 'Ошибка проверки токена' })
  }
}
const vkPayFiat = async (req, res) => {
  const { type, object, group_id } = req.body

  // 1. Подтверждение адреса (уже сделали)
  if (type === 'confirmation') {
    return res.send('0b88cf02')
  }

  try {
    // 2. Обработка успешного платежа
    if (type === 'vkpay_transaction') {
      const {
        from_id, // vkId пользователя
        order_id, // Уникальный ID транзакции VK Pay
        amount, // Сумма в копейках
        data, // Наша строка 'ready_id' или 'custom_id'
      } = object

      // Парсим данные как в старом коде
      const valuesItem = data ? data.split('_') : []
      const valueTypePlan = valuesItem[0] || 'ready'
      const cleanPlanId = valuesItem[1] || 'without Id'

      const vkOrderId = String(order_id)
      const vkId = String(from_id)

      // Проверка на дубликаты (защита от повторных уведомлений)
      const existing = await Order.findOne({ orderId: vkOrderId })
      if (existing) {
        return res.send('ok') // Обязательно 'ok'
      }

      // Находим или создаем пользователя
      const user = await User.findOneAndUpdate(
        { vkId: vkId },
        { $setOnInsert: { vkId: vkId } },
        { upsert: true, new: true },
      )

      // Создаем запись о покупке
      await Order.create({
        orderId: vkOrderId,
        userId: user._id,
        vkId: vkId,
        typePlan: valueTypePlan,
        planId:
          valueTypePlan === 'ready' ? cleanPlanId : 'without Id',
        status: 'completed',
        isUsed: false,
      })

      // 3. Отвечаем ВК, что уведомление получено успешно
      return res.send('ok')
    }

    // На все остальные события (например, подписка на сообщество и т.д.)
    return res.send('ok')
  } catch (error) {
    console.error('Ошибка в обработке VK Pay:', error)
    // В Callback API даже при ошибке лучше вернуть 200,
    // чтобы ВК не завалил сервер повторными запросами,
    // либо логировать ошибку отдельно.
    return res.status(500).send('internal error')
  }
}

const createPaymentYooKassa = async (req, res) => {
  try {
    const vkId = req.vkId
    const { tierId } = req.body
    const tier = TIER_SETTINGS[tierId]

    if (!tier)
      return res.status(400).json({ message: 'Неверный статус' })

    const idempotenceKey = uuidv4()

    const auth = Buffer.from(
      `${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`,
    ).toString('base64')

    // Находим или создаем пользователя
    const user = await User.findOneAndUpdate(
      { vkId: vkId },
      { $setOnInsert: { vkId: vkId } },
      { upsert: true, new: true },
    )

    // Создаем запись "создано" в вашей коллекции Order
    const order = await Order.create({
      orderId: 'pending',
      userId: user._id,
      vkId,
      tierId,
      typeOrder: 'tier_upgrade',
      status: 'created',
    })

    const response = await axios.post(
      YOOKASSA_API_URL,
      {
        amount: { value: tier.price, currency: 'RUB' },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `https://vk.com/app53406141`,
        },
        description: `Оплата статуса ${TIER_SETTINGS[tierId].title} в приложении Формула Бега`,
        metadata: {
          mongoOrderId: order._id.toString(),
          dbUserId: user._id,
          tierId: tierId,
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Idempotence-Key': idempotenceKey,
          'Content-Type': 'application/json',
        },
      },
    )

    res.json({
      confirmationUrl: response.data.confirmation.confirmation_url,
    })
  } catch (error) {
    console.error(
      'Payment Create Error:',
      error.response?.data || error.message,
    )
    res.status(500).json({ message: 'Ошибка формирования платежа' })
  }
}

const handleWebhookYooKassa = async (req, res) => {
  try {
    const { event, object } = req.body
    console.log('Данные из хука юкасса')
    console.log(event)
    console.log(object.metadata)
    if (event === 'payment.succeeded') {
      const { mongoOrderId, dbUserId, tierId } = object.metadata
      const settings = TIER_SETTINGS[tierId]

      // 1. Обновляем статус заказа в вашей БД
      await Order.findByIdAndUpdate(mongoOrderId, {
        status: 'completed',
      })

      // 2. Обновляем лимиты и статус пользователя в коллекции User
      await User.findByIdAndUpdate(
        {dbUserId},
        {
          tier: tierId,
          customPlansLimit: settings.custom,
          readyPlansLimit: settings.ready,
        },
      )

      console.log(`User ${dbUserId} upgraded to ${tierId}`)
    }

    // ЮKassa всегда ждет 200 OK в ответ
    res.status(200).send('OK')
  } catch (error) {
    console.error('Webhook Error:', error)
    res.status(500).send('Internal Server Error')
  }
}

export { createPaymentYooKassa, handleWebhookYooKassa }
