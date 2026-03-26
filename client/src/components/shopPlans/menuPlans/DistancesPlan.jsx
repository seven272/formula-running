import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './MenuPlans.module.css'
import ListPlans from './ListPlans'
import { fetchGetAllPlans } from '../../../redux/slices/plansSlice'

const DistancesPlan = ({ listDistances, type }) => {
  const dispatch = useDispatch()
  const [distance, setDistance] = useState('')

  const handleDistance = (elem) => {
    dispatch(fetchGetAllPlans())
    setDistance(elem)
  }
  
  useEffect(() => {
    setDistance('')
  }, [type])

  return (
    <div className={styles.plans__distances}>
      <span className={styles.distance__subtitle}>дистанции:</span>
      <ul className={styles.distance__items}>
        {listDistances.map((elem, inx) => {
          return (
            <li
              key={inx}
              className={
                distance === elem
                  ? `${styles.distance__item_active}`
                  : `${styles.distance__item}`
              }
              onClick={() => handleDistance(elem)}
            >
              <span className={styles.distance__item_text}>
                {elem}
              </span>
            </li> 
          )
        })}
      </ul>
      {distance !== '' &&  <ListPlans type={type} distance={distance} />}
     
    </div>
  )
}

export default DistancesPlan
