import { useEffect, useState } from 'react'
import { Checkbox } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { TbShareOff, TbShare } from 'react-icons/tb'


import styles from './DayPlan.module.css'
import { fetchToggleSessionStatus } from '../../../../redux/slices/currentPlanSlice'
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
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [checked, setChecked] = useState(completed)

  const handleCheck = (evt) => {
    setChecked(evt.target.checked)
    dispatch(fetchToggleSessionStatus({ weekId, sessionId: _id }))
  }

  const handleShareStory = () => {
    shareTrainingStory({ title, descr })
  }

  useEffect(() => {
    const checkParity = () => {
      if (numberDayInWeek % 2 === 0) {
        setIsDarkBackground(false)
      } else {
        setIsDarkBackground(true)
      }
    }
    checkParity()
  }, [])

  return (
    <div
      className={`${styles.day} ${
        isDarkBackground
          ? styles.background_dark
          : styles.background_light
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
