import { useState } from 'react'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { FaPencilAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import styles from './EditItem.module.css'
import FormItem from './form-item/FormItem'
import { fetchUpdateWorkoutUser } from '../../../../redux/slices/userSlice'

const EditItem = ({ d, inx, typePlan, planId, weekId }) => {
  const dispatch = useDispatch()
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [dayTitle, setDayTitle] = useState(d.title || '')
  const [dayDescr, setDayDescr] = useState(d.descr || '')


  const saveUpdatedData = (newTitle, newDescr) => {
    setDayTitle(newTitle)
    setDayDescr(newDescr)
    setIsOpenForm(false)

    const newData = {
      newWorkout: { dayId: d._id, title: newTitle, descr: newDescr },
      typePlan,
      planId,
      weekId,
    }
    dispatch(fetchUpdateWorkoutUser(newData))
  }

  return (
    <div
      className={`${styles.day_wrap} ${inx % 2 ? styles.background_light : styles.background_dark}`}
    >
      <div className={styles.day}>
        <span className={styles.day_name}>{d.day}</span>
        <span className={styles.day_title}>
          <p>{dayTitle}</p>
        </span>
        <span className={styles.day_descr}>
          <p>{dayDescr}</p>
          {d?.isStrength && (
            <span>
              {d.strength.title}{' '}
              <RouterLink
                className={styles.href}
                to="/info/strength-training"
              >
                {d.strength.descr}
              </RouterLink>
            </span>
          )}
        </span>
        <span className={styles.day_wrap_icon}>
          <FaPencilAlt
            size={22}
            onClick={() => setIsOpenForm(true)}
          />
        </span>
      </div>
      {isOpenForm && (
        <FormItem
          openForm={setIsOpenForm}
          initialTitle={dayTitle}
          initialDescr={dayDescr}
          onSave={saveUpdatedData}
        />
      )}
    </div>
  )
}

export default EditItem
