import React from 'react'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './MpkInfo.module.css'

const MpkInfo = () => { 
  const routeNavigator = useRouteNavigator()

  return (
    <div className={styles.mpk_info}>
      <div className={styles.wrap}>
        <button className={styles.btn_back} onClick={() => routeNavigator.push('/info')}>
          <BsBoxArrowInLeft className={styles.btn_icon} />
          назад 
        </button>
        <h3 className={styles.title}>
          МПК тренировки или интервальный бег
        </h3>
        <span className={styles.descr}>
          МПК-тренировки - это интервальные занятия с длиной
          интервалов от 600 до 2000 м. Эти занятия могут выполняться
          на беговой дорожке, асфальте, стадионе или на подъемах.
          Наиболее эффективный способ развития МПК - тренировки с
          интенсивностью 95-100% от текущего МПК. Это примерно
          соответствует соревновательному темпу на 3-5 км.
          Продолжительность отрезков восстановления между интервалами
          должна составлять 50-90% времени интервала.ях или с помощью
          лактометра.
        </span>
      </div>
    </div>
  )
}

export default MpkInfo
