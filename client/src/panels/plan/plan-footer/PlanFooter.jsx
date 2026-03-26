import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { FaRunning } from 'react-icons/fa'
import { VscGraph } from 'react-icons/vsc'
import { FaHeartPulse } from 'react-icons/fa6'

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
          routeNavigator.push('/info/pace')
        }}
      >
        <FaRunning size={18} className={styles.icon} />
        <span>Темп</span>
      </li>
    </ul>
  )
}

export default PlanFooter
