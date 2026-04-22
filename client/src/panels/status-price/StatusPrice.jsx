import React from 'react'
import { Panel } from '@vkontakte/vkui'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from './StatusPrice.module.css'
import { useVkPay } from '../../utils/useVkPay'

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
    price: 3, // Голоса ВК
  },
  {
    id: 'pro',
    title: 'Профи',
    plans: 'до 5 шт',
    attempts: '10 попыток',
    pdf: true,
    stats: true,
    edit: true,
    price: 7,
  },
  {
    id: 'champion',
    title: 'Чемпион',
    plans: 'до 10 шт',
    attempts: '15 попыток',
    pdf: true,
    stats: true,
    edit: true,
    price: 12,
  },
]

const StatusPrice = ({ id }) => {
  const { buyUserTier, loading } = useVkPay()
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
                    ? `${tier.price} голосов`
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
                    ? '✅ PDF версия плана'
                    : '❌ PDF версия плана'}
                </li>
                <li className={tier.stats ? styles.yes : styles.no}>
                  {tier.stats
                    ? '✅ Доступ к статистике тренировок'
                    : '❌ Доступ к статистике тренировок'}
                </li>
                <li className={tier.edit ? styles.yes : styles.no}>
                  {tier.edit
                    ? '✅ Редактирование плана'
                    : '❌ Редактирование плана'}
                </li>
              </ul>

              {tier.price > 0 && (
                <button
                  className={styles.buy_btn}
                  disabled={loading}
                  onClick={() => buyUserTier(tier.id)}
                >
                  Выбрать
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default StatusPrice
