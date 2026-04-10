import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { VscGraph } from 'react-icons/vsc'
import { FaHeartPulse } from 'react-icons/fa6'
import { GiStrong } from "react-icons/gi";

import styles from './PlanFooter.module.css'

const PlanFooter = () => {
  const routeNavigator = useRouteNavigator()
  return (
    <ul className={styles.items}>
      <li
        className={styles.item}
        onClick={() => {
          routeNavigator.push('/info/rpe')
        }}
      >
        <VscGraph size={18} className={styles.icon} />
        <span>RPE</span>
      </li>
      <li
        className={styles.item}
        onClick={() => {
          routeNavigator.push('/info/puls')
        }}
      >
        <FaHeartPulse size={18} className={styles.icon} />
        <span>Пульсовые зоны</span>
      </li>
      <li
        className={styles.item}
        onClick={() => {
          routeNavigator.push('/info/strength-training')
        }}
      >
        <GiStrong size={18} className={styles.icon} />
        <span>Силовые</span>
      </li>
    </ul>
  )
}

export default PlanFooter
