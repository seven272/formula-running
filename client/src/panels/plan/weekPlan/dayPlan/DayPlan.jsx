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

  const isDark = numberDayInWeek % 2 !== 0
  return (
    <div
      className={`${styles.day} ${
        isDark ? styles.background_dark : styles.background_light
      }`}
    >
      <div className={styles.day_wrapper}>
        <span className={styles.day_name}>
          {numberDayInWeek} {day}
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

        <div className={styles.day_share} title="Поделиться в Сторис">
          {isSelected ? (
            <TbShare
              size={22}
              className={styles.icon_share}
              onClick={() => handleShareStory(title, descr)}
              title="Поделиться в Сторис"
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
