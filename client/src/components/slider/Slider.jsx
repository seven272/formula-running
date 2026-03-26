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
        'Хватит откладывать — пора наконец сделать эти 5 км за 30 минут. Этот план прокачает твою выносливость и скорость. Включайся в игру и покажи, на что ты способен!',
      link: '/info',
    },
    {
      title: '10 км за 45 минут',
      descr:
        'Десять километров — это уже не прогулка, это проверка на прочность. Сократи свое время до 45 минут и оставь соперников глотать пыль позади. Докажи, что ты быстрее ракеты!',
      link: '/info',
    },
    {
      title: 'Первый марафон',
      descr:
        'Забудь про оправдания — пора вписать своё имя в список тех, кто покорил 42,2 км. Этот план превратит твои сомнения в стальную выносливость и доведет тебя до финиша. Твой первый марафон начинается здесь!',
      link: '/info',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setInx((prevInx) => (prevInx + 1) % plans.length)
    }, 5500)

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
        onClick={() => routerNavigator.go(`${currentPlan.link}`)}
      >
        смотреть
      </button>
    </div>
  )
}

export default Slider
