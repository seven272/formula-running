import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import PreviewPlan from './previewPlan/PreviewPlan'
import styles from './MenuPlans.module.css'

const ListPlans = ({ type, distance }) => {
  const list = useSelector((state) => state.plans.allPlans)
  const [arrPlans, setArrPlans] = useState(() => [])
 
  const findPlans = () => {
    let resultSearchForType = list.filter(
      (elem) => elem.typeSport === type
    )
    let resultSearchForDistance = resultSearchForType.filter(
      (elem) => elem.distance === distance
    )
    setArrPlans(resultSearchForDistance)
  }

  useEffect(() => {
    findPlans()
  }, [type, distance])

  return (
    <div className={styles.list__plans}>
      {arrPlans.length === 0 &&  <span className={styles.message}>
      Планов по заданным параметрам пока нет. Возможно, вас
      заинтересуют другие дистанции.
    </span>}
 

      {arrPlans.length > 0 &&
        arrPlans.map((elem, inx) => {
          return <PreviewPlan key={inx} objPlan={elem} />
        })}
    </div>
  )
}

export default ListPlans
