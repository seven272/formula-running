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
    if (!startDate) return '' // Если даты нет, ничего не выводим

    const start = new Date(startDate)
    
    // Получаем реальный день недели даты старта (1 - Пн, 2 - Вт ... 7 - Вс)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // Находим точную дату ПОНЕДЕЛЬНИКА самой первой недели плана.
    // Если старт в среду (3), мы отнимаем 2 дня (3 - 1), чтобы уйти на понедельник этой же недели.
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    // Теперь считаем чистое смещение от этого виртуального "первого понедельника"
    // Неделя 0, День 1 (Пн) -> смещение 0 дней.
    // Неделя 0, День 3 (Ср) -> смещение 2 дня.
    // Неделя 1, День 1 (Пн) -> смещение 7 дней.
    const daysOffset = weekNumber * 7 + (numberDayInWeek - 1)

    // Прибавляем смещение к первому понедельнику
    const finalDate = new Date(firstMonday)
    finalDate.setDate(firstMonday.getDate() + daysOffset)

    // Форматируем дату, например: "12 мая"
    return finalDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })
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
          {day}{' '}
          {trainingDate && `, ${trainingDate}`}
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
