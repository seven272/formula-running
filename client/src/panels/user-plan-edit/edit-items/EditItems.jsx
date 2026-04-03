import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { FaPencilAlt } from 'react-icons/fa'
import { useState } from 'react'

import styles from './EditItems.module.css'

import EditItem from './edit-item/EditItem'

const EditItems = ({ plan, typePlan }) => {


  const multipliers = {
    stage: {
      build: 'строительства',
      base: 'базовый',
      peak: 'пиковый',
      taper: 'разгрузочный',
    },
    colors: {
      build: '#b1e4fc',
      base: '#a7bcec',
      peak: '#fd9a9a',
      taper: '#7bf8af',
    },
  }


  return (
    <div className={styles.main_editplan}>
      EditItems
      <div className={styles.plan}>
        <span className={styles.plan_title}>{plan.title}</span>
        {plan.workouts.map((w, inx) => {
          return (
            <div className={styles.week} key={inx}>
              <div
                className={styles.week_header}
                style={{
                  backgroundColor: multipliers.colors[w.stage],
                }}
              >
                <h3>Неделя {w.weekNumber}</h3>
              </div>
              {w.sessions.map((day, inx) => {
                return (
                  <EditItem key={inx} d={day} inx={inx}/>
                  // <div
                  //   key={inx}
                  //   className={`${styles.day} ${inx % 2 ? styles.background_light : styles.background_dark}`}
                  // >
                  //   <span className={styles.day_name}>{d.day}</span>
                  //   <span className={styles.day_title}>
                  //     <p>{d.title}</p>
                  //   </span>
                  //   <span className={styles.day_descr}>
                  //     <p>{d.descr}</p>
                  //     {d?.isStrength && (
                  //       <span>
                  //         {d.strength.title}{' '}
                  //         <RouterLink
                  //           className={styles.href}
                  //           to="/info/strength-training"
                  //         >
                  //           {d.strength.descr}
                  //         </RouterLink>
                  //       </span>
                  //     )}
                  //   </span>
                  //   <span className={styles.day_wrap_icon}>
                  //     <FaPencilAlt
                  //       size={25}
                  //       onClick={handleEditWorkout}
                  //     />
                  //   </span>
                  // </div>
                )
              })}
            </div>
          )
        })}
      </div>
   
    </div>
  )
}

export default EditItems
