import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, ConfigProvider } from 'antd'
import locale from 'antd/locale/ru_RU'
import moment from 'moment'
import { TbClockEdit } from 'react-icons/tb'
import { MdClose } from "react-icons/md";

import styles from './StartTraining.module.css'

const StartTraining = ({ getArrWeeks, show }) => {
  const plan = useSelector((state) => state.plan.plan)

  const formingArrayDates = (propsDate = '2025-01-27') => {
    const arrWeeks = []
    // в начале определяем пон и вс заданной недели с помощью методов startOf/endOf
    const begin = moment(propsDate).startOf('week').add(1, 'days')
    const end = moment(propsDate).endOf('week').add(1, 'days')

    console.log('Начало недели: ' + begin)
    console.log('Конец недели: ' + end)

    if (begin && end) {
      // затем с помощью цикла проходимся по кол-во недель в плане и определяем соответсвующие даты для них
      for (let i = 0; i <= plan.length; i++) {
        const startWeek = moment(begin)
          .add(i * 7, 'days')
          .format('DD.MM.YYYY')
        const endWeek = moment(end)
          .add(i * 7, 'days')
          .format('DD.MM.YYYY')
        let intervalWeek = `${startWeek} - ${endWeek}`
        arrWeeks.push(intervalWeek)
      }

      getArrWeeks(arrWeeks)
      return arrWeeks
    }
  }

  const handleChangeDate = (date) => {
    formingArrayDates(date.$d)
  }

  const handleClose = () => {
    show(false)
  }

  return (
    <div className={styles.start_training}>
      <div className={styles.icon_wrap_start}>
        <TbClockEdit className={styles.icon_start} />
      </div>
      <div className={styles.body_wrap}>
        <span className={styles.title}>
          Укажите дату начала тренировок
        </span>
        <ConfigProvider locale={locale}>
          <DatePicker
            onChange={handleChangeDate}
            picker="day"
            format="DD-MM-YYYY"
            placeholder="выберите неделю"
          />
        </ConfigProvider>
      </div>
      <div className={styles.icon_wrap_close}>
        <MdClose className={styles.icon_close} onClick={handleClose}/>
      </div>
    </div>
  )
}

export default StartTraining
