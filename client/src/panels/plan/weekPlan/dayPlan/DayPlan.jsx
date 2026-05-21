import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TbShareOff, TbShare, TbMoodOff } from 'react-icons/tb'

import styles from './DayPlan.module.css'
import {
  fetchToggleSessionStatus,
  fetchUpdateSessionStatus,
} from '../../../../redux/slices/currentPlanSlice'
import { shareTrainingStory } from '../../../../utils/vkAppShareStory'
import ModalRating from './modal-rating/ModalRating'
import Checkbox from '../../../../UI/checkbox/Checkbox'

const DayPlan = ({
  weekId,
  _id,
  day,
  title,
  descr,
  completed,
  numberDayInWeek,
  weekNumber,
  startDate,
  isEmptyBeforeStart = false, 
}) => {
  const dispatch = useDispatch()
  const [isSelected, setIsSelected] = useState(completed)

  const handleCheck = (newValue) => {
    setIsSelected(newValue)
    dispatch(fetchToggleSessionStatus({ weekId, sessionId: _id }))
  }

  const handleShareStory = () => {
    shareTrainingStory({ title, descr })
  }
  const handleRatingSession = (data) => {
    dispatch(
      fetchUpdateSessionStatus({
        weekId,
        sessionId: _id,
        rating: data.rating,
        mood: data.mood,
      }),
    )
  }

  useEffect(() => {
    setIsSelected(completed)
  }, [completed])

  // Функция для расчета красивой даты тренировки
 const getFormattedDate = () => {
    if (!startDate) return ''

    const start = new Date(startDate)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // Находим виртуальный понедельник текущей недели
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    // Смещение рассчитывается от этого понедельника
    const daysOffset = weekNumber * 7 + (numberDayInWeek - 1)

    const finalDate = new Date(firstMonday)
    finalDate.setDate(firstMonday.getDate() + daysOffset)

    // Форматируем: "Сб, 23 мая"
    const realWeekday = finalDate.toLocaleDateString('ru-RU', { weekday: 'short' })
    const formattedWeekday = realWeekday.charAt(0).toUpperCase() + realWeekday.slice(1)

    const formattedDateOnly = finalDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })

    return `${formattedWeekday} ${formattedDateOnly}`
  }
  const trainingDate = getFormattedDate()

  const isDark = numberDayInWeek % 2 !== 0

  if (isEmptyBeforeStart) {
    return (
      <div className={`${styles.day} ${isDark ? styles.background_dark : styles.background_light}`}>
        <div className={styles.day_wrapper}>
          <span className={styles.day_name}>
             {trainingDate}
          </span>
          <span className={styles.day_title} style={{ color: 'var(--color-grey)' }}>
            Ожидание старта плана
          </span>
          <span className={styles.day_descr} style={{ fontStyle: 'italic' }}>
            Этот день недели идет до выбранной вами даты начала тренировок.
          </span>
        </div>
      </div>
    )
  }
// СТАНДАРТНОЕ ОТОБРАЖЕНИЕ РЕАЛЬНОЙ ТРЕНИРОВКИ ПЛАНА
  return (
    <div
      className={`${styles.day} ${
        isDark ? styles.background_dark : styles.background_light
      }`}
    >
      <div className={styles.day_wrapper}>
        <span className={styles.day_name}>
          {trainingDate ? trainingDate : day}
        </span>
        <span className={styles.day_title}>{title}</span>
        <span className={styles.day_descr}>{descr}</span>

        <span className={styles.day_check}>
          <Checkbox
            value={isSelected}
            changed={handleCheck}
            isDisabled={false}
          />
        </span>

        <div className={styles.day_rating} title="Оценить тренировку">
          {isSelected ? (
            <ModalRating getData={handleRatingSession} />
          ) : (
            <TbMoodOff
              size={22}
              className={styles.icon_rating_disabled}
            />
          )}
        </div>

        <div
          className={styles.day_share}
          title="Поделиться в истории"
        >
          {isSelected ? (
            <TbShare
              size={22}
              className={styles.icon_share}
              onClick={() => handleShareStory(title, descr)}
              title="Поделиться в истории"
            />
          ) : (
            <TbShareOff
              size={22}
              className={styles.icon_share_disabled}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DayPlan
