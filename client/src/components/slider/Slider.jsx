import { useState, useEffect } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import styles from './Slider.module.css'

const Slider = () => {
  const [inx, setInx] = useState(0)
  const routerNavigator = useRouteNavigator()

  const plans = [
    {
      title: '5 км за 30 минут',
      descr:
        'Этот план прокачает твою выносливость и скорость. Хватит откладывать — пора наконец сделать эти 5 км за 30 минут!',
      idPlan: '69ccff95de8a5978b9a5c0cf',
    },
    {
      title: '10 км на личный рекорд',
      descr:
        'Десять километров — это уже проверка на прочность. Сократи свое время до 60 минут и докажи, что ты быстрее ракеты!',
      idPlan: '69cd1cacde8a5978b9a5f45e',
    },
    {
      title: 'Первый марафон',
      descr:
        'Пора вписать своё имя в список тех, кто покорил 42,2 км. Этот план превратит твои сомнения в стальную выносливость и доведет тебя до финиша!',
      idPlan: `69cd4702de8a5978b9a65535`,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setInx((prevInx) => (prevInx + 1) % plans.length)
    }, 6500)

    return () => clearInterval(interval) //очищаем таймер при удалении компонента
  }, [plans.length])

  // Защита на случай, если данные не загружены
  const currentPlan = plans[inx]

  return (
    <div className={styles.main_slider}>
      <span className={styles.title}>{currentPlan.title}</span>
      <span className={styles.descr}>{currentPlan.descr}</span>
      <button
        className={styles.btn}
        onClick={() =>
          routerNavigator.push(`shop/plan/${currentPlan.idPlan}`)
        }
      >
        смотреть
      </button>
    </div>
  )
}

export default Slider
