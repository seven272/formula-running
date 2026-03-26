import { useState, useEffect } from 'react'

import styles from './RaceGoal.module.css'

const RaceGoal = ({ getData }) => {
  const [level, setLevel] = useState('')
  const [time, setTime] = useState({
    h: '',
    m: '',
    s: '',
  })

  const handleLevel = (evt) => {
    setLevel(evt.target.value)
  } 

  const handleTime = (evt) => {
    evt.target.value = evt.target.value
      .replace(/[^\d.]/g, '')
      .substr(0, 2)

    let name = evt.target.name
    let value = Number(evt.target.value)
    if (name === 'h' && value > 6) {
      value = 6
    } else if ((name === 'm' || name === 's') && value > 59) {
      value = 59
    }
    setTime((prev) => {
      return { ...prev, [name]: value }
    })
  }

  useEffect(() => {
    getData({
      level,
      time,
    })
  }, [level, time])

  return (
    <div className={styles.main_rg}>
      <span className={styles.title}>Время и уровень подготовки</span>

      <div className={styles.level_user}>
        <span className={styles.level_user_title}>
          Уровень спортсмена
        </span>

        <select
          className={styles.select_form}
          value={level}
          name="level-user"
          onChange={handleLevel} 
        >
          <option value="" disabled >
            ваш уровень
          </option>
          <option value="beginner">начинающий</option>
          <option value="intermediate">опытный</option>
          <option value="advanced">продвинутый</option>
        </select>
      </div>

      <div className={styles.time}>
        <span className={styles.time_title}>
          Время прохождения дистанции
        </span>
        <div className={styles.time_inputs_wrap}>
          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>часы</span>
            <input
              type="text"
              name="h"
              value={time.h}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 6"
            />
          </label>

          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>минуты</span>
            <input
              type="text"
              name="m"
              value={time.m}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 59"
            />
          </label>

          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>секунды</span>
            <input
              type="text"
              name="s"
              value={time.s}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 59"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default RaceGoal
