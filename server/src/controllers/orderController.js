import mongoose from 'mongoose'

import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

const payVk = async (req, res) => {
  const ITEMS_STORE = {
    ready_plan: {
      title: 'Готовый план',
      price: 10,
      photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
    },
    custom_plan: {
      title: 'Созданный план',
      price: 15,
      photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
    },
  }
  const { notification_type, item, user_id, order_id, status } =
    req.body

  console.log(req.body)
  try {
    // ЗАПРОС ИНФОРМАЦИИ О ТОВАРЕ
    if (
      notification_type === 'get_item' ||
      notification_type === 'get_item_test'
    ) {
      const product = ITEMS_STORE[item]

      console.log(product)

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
      const orderId = String(order_id)
      const vkId = String(user_id)

      //Проверка на дубликаты заказов. Проверяем, не обрабатывали ли мы этот order_id ранее
      const existing = await Order.findOne({ orderId })
      if (existing) {
        return res.json({
          response: { order_id: orderId, app_order_id: existing._id },
        })
      }

      // Проверка на уже созданного пользователя
      // 2. Создаем или находим пользователя (без выдачи плана)
      const user = await User.findOneAndUpdate(
        { vkId: vkId },
        { $setOnInsert: { vkId: vkId } }, // Данные только при создании
        { upsert: true, new: true },
      )

      // 3. Создаем запись о покупке
      // Именно наличие этого Order будет основанием для выдачи плана в другом контроллере
      const newOrder = await Order.create({
        orderId: orderId,
        userId: user._id, // Привязываем к нашему внутреннему ID
        vkId: vkId,
        item: item,
        status: 'completed',
      })
      // 4. Отвечаем VK. VK ожидает id заказа в вашей системе (app_order_id)
      return res.json({
        response: {
          order_id: orderId,
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
      error: { error_code: 1, error_msg: 'Внутренняя ошибка сервера' }
    })
  }
}

export { payVk }
