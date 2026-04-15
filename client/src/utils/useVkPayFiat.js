import bridge from '@vkontakte/vk-bridge'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { changeStatusToken } from '../redux/slices/customPlanSlice'
import { fetchBuyPlan } from '../redux/slices/plansSlice'

const useVkPayFiat = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // Добавляем параметр amount (цена в рублях)
  const payFiatMoney = async (typePlan, planId, amount = 10) => {
    try {
      setLoading(true)

      // 1. Вызываем окно оплаты VK Pay
      const data = await bridge.send('VKWebAppOpenPayForm', {
        app_id: 53406141, //  ID ПРИЛОЖЕНИЯ
        action: 'pay-to-group',
        params: {
          amount: amount, // сумма в рублях
          description: `${typePlan === 'ready' ? 'Покупка готового тренированого плана' : 'Оплата генерации тренировачного плана'}`,
          group_id: 228182555, // ID вашего сообщества
          data: `${typePlan}_${planId}`, // Передаем метку для бэкенда
        },
      })

      // 2. Обрабатываем результат
      // В VK Pay если promise зарезолвился успешно - форма была закрыта после оплаты
      if (data.status) {
        message.success('Оплата принята в обработку!')

        // Ждем немного, чтобы бэкенд успел получить и обработать Callback от VK
        setTimeout(() => {
          if (typePlan === 'custom') {
            dispatch(changeStatusToken(true))
          } else if (typePlan === 'ready') {
            dispatch(fetchBuyPlan(planId))
          }
          setLoading(false)
        }, 2000)
      }
    } catch (error) {
      setLoading(false)
      console.error('Ошибка при оплате VK Pay:', error)

      // Обработка закрытия окна пользователем
      if (error.error_data && error.error_data.error_code === 4) {
        message.warning('Оплата отменена')
      } else {
        message.error('Ошибка при проведении платежа')
      }
    }
  }

  return {
    payFiatMoney,
    loading,
  }
}

export { useVkPayFiat }
