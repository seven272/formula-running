import { useEffect, useState } from 'react'
import { Checkbox } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { TbShareOff, TbShare, TbMoodSmile, TbMoodOff } from 'react-icons/tb'


import styles from './DayPlan.module.css'
import { fetchToggleSessionStatus, fetchUpdateSessionStatus } from '../../../../redux/slices/currentPlanSlice'
import { shareTrainingStory } from '../../../../utils/vkAppShareStory'

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
  const [checked, setChecked] = useState(completed)

  const handleCheck = (evt) => {
    setChecked(evt.target.checked)
    dispatch(fetchToggleSessionStatus({ weekId, sessionId: _id }))
  }

  const handleShareStory = () => {
    shareTrainingStory({ title, descr })
  }
  const handleRatingSession = () => {
    dispatch(fetchUpdateSessionStatus({ weekId, sessionId: _id, rating, mood}))
  }

  useEffect(() => {
    setChecked(completed)
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
            noPadding="true"
            checked={checked}
            onChange={handleCheck}
          />
        </span>

         <div className={styles.day_rating} title="Оценить тренировку">
          {checked ? (
            <TbMoodSmile
              size={18}
              className={styles.icon_rating}
              onClick={() => handleRatingSession()}
              title="Оценить тренировку"
            />
          ) : (
            <TbMoodOff
              size={18}
              className={styles.icon_rating_disabled}
            />
          )}
        </div>

        <div className={styles.day_share} title="Поделиться в Сторис">
          {checked ? (
            <TbShare
              size={18}
              className={styles.icon_share}
              onClick={() => handleShareStory(title, descr)}
              title="Поделиться в Сторис"
            />
          ) : (
            <TbShareOff
              size={18}
              className={styles.icon_share_disabled}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DayPlan
