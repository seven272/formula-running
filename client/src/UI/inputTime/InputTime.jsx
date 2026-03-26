import React from 'react'
import dayjs from 'dayjs'
import { TimePicker } from 'antd'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import styles from './InputTime.module.css'

const InputTime = ({ title, name, getTime }) => {
  dayjs.extend(customParseFormat)

  //два аргумента по умолчанию от антдесижн time, timeString: обьект с множетсовм данных и время в строковом формате
  const onChangeTime = (time, timeString) => {
    console.log(time, timeString)
    getTime({ name: name, value: timeString })
  }

  return (
    <div className={styles.time__wpapper}>
      <span className={styles.time__title}>{title}</span>
      <div className={styles.time__wpapper_two}>
        <span className={styles.time__subtitle}>
          часы:минуты:секунды
        </span>
        <TimePicker
          onChange={onChangeTime}
          defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
          placeholder="введите время"
          size="large"
          showNow={false}
          className={styles.time__input}
        />
      </div>
    </div>
  )
}

export default InputTime
