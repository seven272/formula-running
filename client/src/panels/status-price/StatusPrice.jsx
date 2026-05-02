import bridge from '@vkontakte/vk-bridge'
import { Panel } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { TbLock } from 'react-icons/tb'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from './StatusPrice.module.css'

import { fetchPaymentLink } from '../../redux/slices/userSlice'

const TIERS = [
  {
    id: 'amateur',
    title: 'Физкультурник',
    plans: '1 план',
    attempts: '1 попытка',
    pdf: false,
    stats: false,
    edit: false,
    price: 0, // Бесплатно
  },
  {
    id: 'athlete',
    title: 'Атлет',
    plans: 'до 3 шт',
    attempts: '3 попытки',
    pdf: true,
    stats: true,
    edit: true,
    price: 500, // рублей
  },
  {
    id: 'pro',
    title: 'Профи',
    plans: 'до 5 шт',
    attempts: '10 попыток',
    pdf: true,
    stats: true,
    edit: true,
    price: 1000,
  },
  {
    id: 'champion',
    title: 'Чемпион',
    plans: 'до 10 шт',
    attempts: '15 попыток',
    pdf: true,
    stats: true,
    edit: true,
    price: 1500,
  },
]

const StatusPrice = ({ id }) => {
  const dispatch = useDispatch()

  const canShowPayments = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const platform = urlParams.get('vk_platform')
    // Оплата разрешена ТОЛЬКО на десктопе (desktop_web)
    // и в мобильном браузере (mobile_web)
    const allowedPlatforms = ['desktop_web', 'mobile_web']
    //возвращает true если platform есть в массиве с разрешенными версиями Вконтакте
    return allowedPlatforms.includes(platform)
  }

  const handleBuy = async (tierId) => {
    try {
      // 1. Получаем URL от бэкенда
      const confirmationUrl = await dispatch(
        fetchPaymentLink({ tierId }),
      ).unwrap()

      if (confirmationUrl) {
        // 2. Самый надежный метод для открытия ЮKassa в ВК
        try {
          await bridge.send('VKWebAppOpenExternalApp', {
            url: confirmationUrl,
          })
        } catch (bridgeError) {
          // Резервный вариант, если Bridge не сработал (например, в обычном браузере)
          window.open(confirmationUrl, '_blank')
        }
      }
    } catch (error) {
      console.error('Ошибка при получении ссылки:', error)
    }
  }

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Выберите свой уровень</h2>
        <div className={styles.grid}>
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.card} ${styles[tier.id]}`}
            >
              <div className={styles.header}>
                <h3>{tier.title}</h3>
                <div className={styles.price}>
                  {tier.price > 0
                    ? `${tier.price} рублей`
                    : 'Бесплатно'}
                </div>
              </div>

              <ul className={styles.features}>
                <li>
                  <span>Готовые планы:</span> {tier.plans}
                </li>
                <li>
                  <span>Создание плана:</span> {tier.attempts}
                </li>
                <li className={tier.pdf ? styles.yes : styles.no}>
                  {tier.pdf
                    ? '🔵 PDF версия плана'
                    : '❌ PDF версия плана'}
                </li>
                <li className={tier.stats ? styles.yes : styles.no}>
                  {tier.stats
                    ? '🔵 Доступ к статистике тренировок'
                    : '❌ Доступ к статистике тренировок'}
                </li>
                <li className={tier.edit ? styles.yes : styles.no}>
                  {tier.edit
                    ? '🔵 Редактирование плана'
                    : '❌ Редактирование плана'}
                </li>
              </ul>

              {tier.price > 0 &&
                (canShowPayments() ? (
                  <button
                    className={styles.buy_btn}
                    disabled={false}
                    onClick={() => handleBuy(tier.id)}
                  >
                    Выбрать
                  </button>
                ) : (
                  <button className={styles.buy_btn} disabled={true}>
                    <TbLock size={20}/>
                  </button>
                ))}
            </div>
          ))}
        </div>
        {/* {!canShowPayments() && <span className={styles.warning}>*оплата в мобильном приложении недоступна</span>} */}
        
      </div>
      <Footer />
    </Panel>
  )
}

export default StatusPrice
