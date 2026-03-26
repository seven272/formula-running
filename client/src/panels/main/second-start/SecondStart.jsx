import React from 'react'
import { useSelector } from 'react-redux'
import { Progress } from '@vkontakte/vkui'
import { PiShootingStarThin } from 'react-icons/pi'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import ActivityCalendar from '../../../components/activity-calendar/ActivityCalendar'
import styles from './SecondStart.module.css'
import Img from '../../../assets/images/components/main/main6.jpeg'
const SecondStart = () => {
  const routerNavigator = useRouteNavigator()
  const { plan, activityDates, progress } = useSelector(
    (state) => state.currentPlan,
  )
  return (
    <div className={styles.main_second_start}>
      <span className={styles.title}>
        {plan.title || 'активный план'}
      </span>
      <div className={styles.progress_wrap}>
        <span className={styles.progress_title}>Прогресс</span>
        <Progress
          aria-labelledby="progresslabel"
          value={progress.percent}
          height={3}
        />
      </div>
      <ActivityCalendar activityDates={activityDates} />
      <button
        className={styles.btn}
        onClick={() => routerNavigator.push('/plan')}
      >
        <span>к тренировкам</span>
        <PiShootingStarThin size={15} />
      </button>
      <div className={styles.img_wrap}>
        <img
          className={styles.img}
          src={Img}
          alt="банер главной страницы"
        />
      </div>
    </div>
  )
}

export default SecondStart
