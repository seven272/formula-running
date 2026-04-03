import { useState } from 'react'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { FaPencilAlt } from 'react-icons/fa'

import styles from './EditItem.module.css'
import FormItem from './form-item/FormItem'

const EditItem = ({ d, inx }) => {
  const [isOpenForm, setIsOpenForm] = useState(false)

  const handleEditWorkout = () => {
    setIsOpenForm(true)
  }

  return (
    <div
      className={`${styles.day_wrap} ${inx % 2 ? styles.background_light : styles.background_dark}`}
    >
      <div className={styles.day}>
        <span className={styles.day_name}>{d.day}</span>
        <span className={styles.day_title}>
          <p>{d.title}</p>
        </span>
        <span className={styles.day_descr}>
          <p>{d.descr}</p>
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
          <FaPencilAlt size={25} onClick={handleEditWorkout} />
        </span>
      </div>
      {isOpenForm && <FormItem openForm={setIsOpenForm} />}
    </div>
  )
}

export default EditItem
