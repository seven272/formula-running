import { useState, useEffect } from 'react'
import { Switch } from 'antd'

import styles from './Schedule.module.css'

const Schedule = ({ getData }) => {
  const [countDays, setCountDays] = useState(null)
  const [longDay, setLongDay] = useState('')
  const [strengthDays, setStrengthDays] = useState([])
  const [isStrength, setIsStrength] = useState(false)

  const arrDays = [
    { title: 'Пн', value: 'Пн' },
    { title: 'Вт', value: 'Вт' },
    { title: 'Ср', value: 'Ср' },
    { title: 'Чт', value: 'Чт' },
    { title: 'Пт', value: 'Пт' },
    { title: 'Сб', value: 'Сб' },
    { title: 'Вс', value: 'Вс' },
  ]

    const arrSterngthDays = [
    { title: 'Пн', value: 0 },
    { title: 'Вт', value: 1 },
    { title: 'Ср', value: 2 },
    { title: 'Чт', value: 3 },
    { title: 'Пт', value: 4 },
    { title: 'Сб', value: 5 },
    { title: 'Вс', value: 6 },
  ]

  const nums = [3, 4, 5, 6, 7]

  const handleSelectDays = (payload) => {
    setCountDays(payload)
  }

  const handleLongDay = (day) => {
    setLongDay(day)
  }

  const handleSwitch = (checked) => {
    setIsStrength(checked)
    if (!checked) {
      setStrengthDays([])
    }
  }

  useEffect(() => {
    getData({
      countDays,
      longDay,
      isStrength,
      strengthDays,
    })
  }, [countDays, longDay, isStrength, strengthDays])

  const handleStrengthDays = (payload) => {
    let index = strengthDays.findIndex((day) => payload === day)
    if (index !== -1) {
      const newArr = strengthDays.filter((day) => day !== payload)
      setStrengthDays([...newArr])
    } else if (index === -1) {
      setStrengthDays((prev) => [...prev, payload])
    }
  }

  return (
    <div className={styles.main_schedule}>
      <span className={styles.title}>Тренировачное расписание</span>

      <div className={styles.days}>
        <span className={styles.days_title}>
          Тренировачные дни (от 3 до 7)
        </span>
        <div className={styles.days_items}>
          {nums.map((num, inx) => {
            return (
              <span
                key={inx}
                className={
                  countDays === num
                    ? `${styles.days_item_active}`
                    : `${styles.days_item}`
                }
                onClick={() => handleSelectDays(num)}
              >
                {num}
              </span>
            )
          })}
        </div>
      </div>

      <div className={styles.long_days}>
        <span className={styles.long_days_title}>
          Выберите день для длительной пробежки
        </span>

        <div className={styles.long_days_items}>
          {arrDays.map((day, inx) => {
            return (
              <span
                key={inx}
                className={
                  day.value === longDay
                    ? `${styles.long_days_item_active}`
                    : `${styles.long_days_item}`
                }
                onClick={() => handleLongDay(day.value)}
              >
                {day.title}
              </span>
            )
          })}
        </div>
      </div>

      <div className={styles.strength_days}>
        <span className={styles.strength_days_title}>
          Будут силовые тренировки?
        </span>

        <Switch
          size="default"
          defaultChecked={false}
          checkedChildren="да"
          unCheckedChildren="нет"
          onChange={handleSwitch}
        />

        {isStrength && (
          <div className={styles.strength_days_block}>
            <span className={styles.strength_days_title}>
              Выберите дни для силовых
            </span>

            <div className={styles.days_items}>
              {arrSterngthDays.map((day, inx) => {
                return (
                  <span
                    key={inx}
                    className={
                      strengthDays.includes(day.value)
                        ? `${styles.strength_days_item_active}`
                        : `${styles.strength_days_item}`
                    }
                    onClick={() => handleStrengthDays(day.value)}
                  >
                    {day.title}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Schedule
