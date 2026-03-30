import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

const ITEMS_STORE = {
  ready: {
    title: 'Готовый план',
    price: 10,
    photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
  },
  custom: {
    title: 'Созданный план',
    price: 15,
    photo_url: 'https://sportplans.ru/static/other/buy-icon.png',
  },
}

const payVk = async (req, res) => {
  const { notification_type, item, user_id, order_id, status } =
    req.body
  console.log(req.body)

  const valuesItem = item.split('_')
  //тип плана ready / custom
  const valueTypePlan = valuesItem[0]
  // Извлекаем чистый ID плана из строки 'ready_id'/'custom_id'
  const cleanPlanId = valuesItem[1] || '?' // если ID нет, берем тип

  try {
    // ЗАПРОС ИНФОРМАЦИИ О ТОВАРЕ
    if (
      notification_type === 'get_item' ||
      notification_type === 'get_item_test'
    ) {
      const product = ITEMS_STORE[valueTypePlan]

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
      const vkOrderId = String(order_id)
      const vkId = String(user_id)

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
        { $setOnInsert: { vkId: vkId } }, // Если юзер не найден, то создаем и передаем данные для создания
        { upsert: true, new: true },
      )

      // 3. Создаем запись о покупке
      // Именно наличие этого Order будет основанием для выдачи плана в другом контроллере
      const newOrder = await Order.create({
        orderId: vkOrderId,
        userId: user._id, // Привязываем к внутреннему ID пользователя
        vkId: vkId,
        typePlan: valueTypePlan,
        planId:
          valueTypePlan === 'ready' ? cleanPlanId : 'without Id',
        status: 'completed',
        isUsed: false,
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
    // Ищем хотя бы один неиспользованный оплаченный кастомный план
    const activeOrder = await Order.exists({
      vkId,
      typePlan: 'custom',
      status: 'completed',
      isUsed: false,
    })

    res.json({ hasToken: !!activeOrder }) //возвращает true или false если объект или underfine
  } catch (error) {
    res.status(500).json({ message: 'Ошибка проверки токена' })
  }
}

export { payVk, checkCustomToken }
