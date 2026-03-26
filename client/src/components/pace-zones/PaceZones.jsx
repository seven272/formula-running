import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './PaceZones.module.css'
import paceForZones from '../../assets/data/paceForZones'
import { fetchPaceUser } from '../../redux/slices/userSlice'

const PaceZones = () => {
  const dispatch = useDispatch()
  const { pace } = useSelector((state) => state.user)
  const [listPaces, setListPaces] = useState({ ...paceForZones })
  const [bestTime, setBestTime] = useState(pace)

  const arrColors = [
    'rgba( 187, 192, 201 , 0.5)',
    'rgba(18, 85, 182, 0.5)',
    'rgba( 15, 196, 15, 0.5)',
    'rgba(  228, 245, 11, 0.5)',
    'rgba(247, 38, 10 , 0.5)',
  ]

  const handleChooseBestTime = (evt) => {
    setBestTime(evt.target.value)
    dispatch(fetchPaceUser(evt.target.value))
  }

  useEffect(() => {
    setBestTime(pace)
  }, [pace])

  return (
    <div className={styles.pace_zones}>
      <span className={styles.title}>
        Выберите свое лушее время на дистанции 5 км или 10 км
      </span>
      <span className={styles.title_value}>5км | 10км</span>
      <select
        defaultValue={pace}
        className={styles.select_form}
        name="objectPace"
        onChange={handleChooseBestTime}
      >
        {/* <option value="" selected disabled hidden>
          выбрать
        </option> */}
        {Object.keys(listPaces).map((time, inx) => {
          return (
            <option key={inx} value={time}>
              {time}
            </option>
          )
        })}
      </select> 

      <span className={styles.title}>
        Таблица темпа (мин.сек.) по зонам
      </span>
      <ul className={styles.items}>
        <li className={styles.item}>
          <span
            className={`${styles.zone} ${styles.el1}`}
            style={{ backgroundColor: arrColors[0] }}
          >
            Зона 1
          </span>
          <span
            className={`${styles.zone} ${styles.el2}`}
            style={{ backgroundColor: arrColors[1] }}
          >
            Зона 2
          </span>
          <span
            className={`${styles.zone} ${styles.el3}`}
            style={{ backgroundColor: arrColors[2] }}
          >
            Зона 3
          </span>
          <span
            className={`${styles.zone} ${styles.el4}`}
            style={{ backgroundColor: arrColors[3] }}
          >
            Зона 4
          </span>
          <span
            className={`${styles.zone} ${styles.el5}`}
            style={{ backgroundColor: arrColors[4] }}
          >
            Зона 5
          </span>
        </li>
        <li className={styles.item}>
          {listPaces[bestTime].map((elem, inx) => {
            return (
              <span
                key={inx}
                className={`${styles.zone}`}
                style={{ backgroundColor: arrColors[inx] }}
              >
                {elem}
              </span>
            )
          })}
        </li>
      </ul>
    </div>
  )
}

export default PaceZones
