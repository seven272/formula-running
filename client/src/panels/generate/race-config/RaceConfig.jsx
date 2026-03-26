import { useState, useEffect } from 'react'

import styles from './RaceConfig.module.css'

const RaceConfig = ({ getData }) => {
  const [distance, setDistance] = useState(null)
  const [period, setPeriod] = useState('')
  const arrWeeks = [
    { title: '4 недели', value: 4 },
    { title: '8 недель', value: 8 },
    { title: '12 недель', value: 12 },
    { title: '16 недель', value: 16 },
  ]

  const handlePeriod = (evt) => {
    setPeriod(Number(evt.target.value))
  }

  useEffect(() => {
    getData({
      distance,
      period,
    })
  }, [distance, period])

  return (
    <div className={styles.main_rc}>
      <span className={styles.title}>Параметры плана</span>

      <div className={styles.distance}>
        <span className={styles.distance_title}>
          Желаемая дистанция
        </span>

        <div className={styles.distance_items}>
          {/* <span
            className={
              distance === '5km'
                ? `${styles.distance_item_active}`
                : `${styles.distance_item}`
            }
            onClick={() => setDistance('5km')}
          >
            5 км
          </span> */}

          <span
            className={
              distance === '10km'
                ? `${styles.distance_item_active}`
                : `${styles.distance_item}`
            }
            onClick={() => setDistance('10km')}
          >
            10 км
          </span>

          <span
            className={
              distance === '21km'
                ? `${styles.distance_item_active}`
                : `${styles.distance_item}`
            }
            onClick={() => setDistance('21km')}
          >
            21 км
          </span>

          <span
            className={
              distance === '42km'
                ? `${styles.distance_item_active}`
                : `${styles.distance_item}`
            }
            onClick={() => setDistance('42km')}
          >
            42 км
          </span>
        </div>
      </div>

      <div className={styles.period}>
        <span className={styles.period_title}>Период подготовки</span>

        <select
          className={styles.select_form}
          name="period-name"
          value={period}
          onChange={handlePeriod}
        >
          <option value="" disabled>
            выбрать
          </option>
          {arrWeeks.map((elem, inx) => {
            return (
              <option key={inx} value={elem.value}>
                {elem.title}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default RaceConfig
