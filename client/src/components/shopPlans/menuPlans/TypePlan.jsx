import React, { useEffect, useState } from 'react'

import styles from './MenuPlans.module.css'
import DistancesPlan from './DistancesPlan'

const TypePlan = ({ arrPlans, clearSort }) => {
  const [typePlan, setTypePlan] = useState('')
  const [distances, setDistances] = useState(() => [])

  const handleTypePlan = (inx) => {
    setTypePlan(arrPlans[inx].type)
    setDistances(arrPlans[inx].distances)
  }

  // для добавления активного класса в тип спорта, иначе нужно доп проверку делать в разметке
  let isActiveType = ''
  if (typePlan) {
    isActiveType = typePlan
  } else {
    isActiveType = ''
  }

  useEffect(() => {
    setTypePlan('')
    setDistances([])
  }, [clearSort])

  return (
    <div className={styles.plans__types}>
      <span className={styles.type__subtitle}>
        или выберите вид спорта:{' '}
      </span>
      <ul className={styles.type__items}>
        {arrPlans.map((type, inx) => {
          return (
            <li
              key={type.type}
              className={
                isActiveType === type.type
                  ? `${styles.type__item_active}`
                  : `${styles.type__item}`
              }
              onClick={() => handleTypePlan(inx)}
            >
              <div className={styles.icon_wrap}>
                <img src={type.image} className={styles.icon} />
              </div>
              <span className={styles.icon_text}>{type.title}</span>
            </li> 
          )
        })}
      </ul>
      {typePlan && (
        <DistancesPlan listDistances={distances} type={typePlan} />
      )}
    </div>
  )
}

export default TypePlan
