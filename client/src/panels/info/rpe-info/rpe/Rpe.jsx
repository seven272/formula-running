// import {
//   useParams,
//   RouterLink,
//   useRouteNavigator,
// } from '@vkontakte/vk-mini-apps-router'
// import { GoQuestion } from 'react-icons/go'

import styles from './Rpe.module.css'
import { rpeAndPulse } from '../../../../assets/data/rpe'

const Rpe = () => {
  const arrColors = [
    'rgba( 187, 192, 201 , 0.5)',
    'rgba(18, 85, 182, 0.5)',
    'rgba( 15, 196, 15, 0.5)',
    'rgba(  228, 245, 11, 0.5)',
    'rgba(247, 38, 10 , 0.5)',
  ]
  return (
    <div className={styles.rpe}>
      <div className={styles.title_wrap}>
        <span className={styles.title}>Пульсовые зоны и RPE</span>
        {/* <RouterLink to="/info" className={styles.link}>
          <span>Подробнее про RPE</span>
          <GoQuestion size={15} />
        </RouterLink> */}
      </div>

      <ul className={styles.items}>
        <li className={styles.item}>
          <span className={`${styles.subtitle} ${styles.zone}`}>
            Пульсовая зона
          </span>
          <span className={`${styles.subtitle} ${styles.rpe_zone}`}>
            Воспринимаемая нагрузка (RPE)
          </span>
          <span className={`${styles.subtitle} ${styles.breath}`}>
            Дыхание
          </span>
          <span className={`${styles.subtitle} ${styles.talk}`}>
            Возможность разговора
          </span>
        </li>
        {rpeAndPulse.map((elem, inx) => {
          return (
            <li
              key={inx}
              className={styles.item}
              style={{ backgroundColor: arrColors[inx] }}
            >
              <span
                className={`${styles.description} ${styles.zone}`}
              >
                {elem.zone}
              </span>
              <span
                className={`${styles.description} ${styles.rpe_zone}`}
              >
                {elem.rpe}
              </span>
              <span
                className={`${styles.description} ${styles.breath}`}
              >
                {elem.breath}
              </span>
              <span
                className={`${styles.description} ${styles.talk}`}
              >
                {elem.talk}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Rpe
