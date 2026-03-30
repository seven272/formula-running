import bridge from '@vkontakte/vk-bridge'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { message } from 'antd'
import { changeStatusToken } from '../redux/slices/customPlanSlice'
// import { changeStatusPaid } from '../redux/slices/vkUserSlice'

const useVkPay = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const payVirtualMoney = async (typePlan, planId) => {
    console.log(planId)
    try {
      // 1. Вызываем нативное окно оплаты VK
      const data = await bridge.send('VKWebAppShowOrderBox', {
        type: 'item', // Всегда должно быть 'item'
        item: `${typePlan}_${planId}`, // тип плана(ready/custom) и идентификатор товара
      })
      console.log(data)
      if (data.success) {
        // 2. Если VK вернул success, значит пользователь нажал "Оплатить"
        // и деньги (голоса) списались.
        // ВАЖНО: В этот момент бэкенд ПАРАЛЛЕЛЬНО получает callback от VK.
        // Нужно подождать секунду или обновить данные пользователя.
        message.success('Оплата прошла успешно!')
        // Здесь вызов функции обновления баланса или статуса оплаты
        if (typePlan === 'custom') {
          setLoading(true)
          setTimeout(() => {
            dispatch(changeStatusToken())
            setLoading(false)
          }, 1500)
        } else if (typePlan === 'ready') {
           message.success('вызываю контроллер покупки готового плана')
        }
      }
    } catch (error) {
      // Пользователь закрыл окно или произошла ошибка (например, ошибка 13)
      console.error('Ошибка при оплате:', error)
      if (error.error_data && error.error_data.error_code === 4) {
        message.warning('Покупка отменена пользователем')
      } else {
        message.error('Произошла ошибка при связи с сервером VK')
      }
    }
  }

  return {
    payVirtualMoney,
    loading,
  }
}

export { useVkPay }
