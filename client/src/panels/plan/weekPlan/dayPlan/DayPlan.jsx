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
    if (!startDate) return '' // Если даты нет, вернем пустую строку

    const start = new Date(startDate)
    
    // Определяем день недели даты старта (1 - Пн, ..., 7 - Вс)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // Вычисляем виртуальный понедельник первой недели
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    // Считаем общее смещение в днях для текущей тренировки
    const daysOffset = weekNumber * 7 + (numberDayInWeek - 1)

    // Получаем финальную дату для этого дня
    const finalDate = new Date(firstMonday)
    finalDate.setDate(firstMonday.getDate() + daysOffset)

    // Форматируем: "Пн, 12 мая" или "Ср, 20 мая"
    const formatted = finalDate.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })

    // Делаем первую букву дня недели заглавной (например, "Пн, 12 мая")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }

  const trainingDate = getFormattedDate()

  const isDark = numberDayInWeek % 2 !== 0
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
