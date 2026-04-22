import bridge from '@vkontakte/vk-bridge'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'

// Предположим, вы создадите новый экшен для обновления профиля
import { fetchUpdateUserTier } from '../redux/slices/userSlice'

const useVkPay = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const buyUserTier = async (tierId) => {
    setLoading(true)
    try {
      // 1. Вызываем окно оплаты VK.
      // В item теперь передаем статус, например: "tier_pro"
      const data = await bridge.send('VKWebAppShowOrderBox', {
        type: 'item',
        item: `tier_${tierId}`,
      })

      if (data.success) {
        message.success(
          'Оплата прошла успешно! Ваш статус обновляется...',
        )

        // 2. Имитируем небольшую задержку, чтобы бэкенд успел обработать callback от VK
        setTimeout(async () => {
          try {
            // 3. Запрашиваем обновление данных пользователя с бэкенда.
            // Бэкенд проверит транзакцию и вернет новый tier и новые лимиты.
            await dispatch(fetchUpdateUserTier()).unwrap()
            message.success('Новые возможности доступны!')
          } catch (err) {
            message.error(
              'Ошибка при обновлении статуса в приложении',
            )
          } finally {
            setLoading(false)
          }
        }, 2000)
      }
    } catch (error) {
      setLoading(false)
      console.error('Ошибка при оплате:', error)
      if (error.error_data && error.error_data.error_code === 4) {
        message.warning('Покупка отменена')
      } else {
        message.error('Ошибка связи с VK')
      }
    }
  }

  return {
    buyUserTier,
    loading,
  }
}

export { useVkPay }
