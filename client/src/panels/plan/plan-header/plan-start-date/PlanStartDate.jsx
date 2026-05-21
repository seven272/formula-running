import React from 'react'
import { useDispatch } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { Input } from '@vkontakte/vkui'

import styles from './PlanStartDate.module.css'
import { fetchSetPlanStartDate } from '../../../../redux/slices/currentPlanSlice'

const PlanStartDate = ({ show, planId, startDate }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    show(false)
  }

  const handleDateChange = (evt) => {
    const selectedDate = evt.target.value
    if (selectedDate) {
      dispatch(
        fetchSetPlanStartDate({
          planId: planId,
          startDate: selectedDate,
        }),
      )
    }
  }

  const handleResetStartDate = () => {
    dispatch(
      fetchSetPlanStartDate({
        planId: planId,
        startDate: null,
      }),
    )
  }

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD для ограничения min в календаре
  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div className={styles.date_plan}>
      <div className={styles.content_wrap}>
        <span className={styles.title}>Календарь тренировок</span>

        {startDate ? (
          <>
            <span className={styles.descr}>
              План начнется:{' '}
              <strong>
                {new Date(startDate).toLocaleDateString(
                  'ru-RU',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
              </strong>
            </span>
            <button
              className={styles.btn_reset_date}
              onClick={handleResetStartDate}
            >
              Сбросить даты плана
            </button>
          </>
        ) : (
          <>
            <span className={styles.descr}>
              Укажите дату первой тренировки, чтобы расписать весь
              план по дням:
            </span>
            <Input
              type="date"
              min={todayStr}
              onChange={handleDateChange}
              style={{
                marginTop: '5px',
                width: '100%',
                maxWidth: '200px',
              }}
            />
          </>
        )}
      </div>

      <div className={styles.icon_wrap_close}>
        <MdClose
          className={styles.icon_close}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

export default PlanStartDate
