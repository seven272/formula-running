import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { GoPencil } from 'react-icons/go'

import styles from './Parameters.module.css'

import AgeHeightWeightForm from '../forms/age-height-weight-form/AgeHeightWeightForm'

const Parameters = () => {
  const userData = useSelector((state) => state.user.profile)
  const [showForm, setShowForm] = useState(false)

  const getIsShowForm = (payload) => {
    setShowForm(payload)
  }

  return (
    <div className={styles.parameters}>
      {showForm ? (
        <AgeHeightWeightForm closeForm={setShowForm} />
      ) : (
        <>
          <ul className={styles.items}>
            <li className={styles.item}>
              <span className={styles.item__title}>Возраст</span>
              <span className={styles.item__data}>
                {userData.age !== '' ? userData.age : 0}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.item__title}>Рост, см</span>
              <span className={styles.item__data}>
                {userData.height !== '' ? userData.height : 0}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.item__title}>Вес, кг</span>
              <span className={styles.item__data}>
                {userData.weight !== '' ? userData.weight : 0}
              </span>
            </li>
          </ul>
          <GoPencil
            className={styles.icon_edit}
            onClick={() => getIsShowForm(!showForm)}
          />
        </>
      )}
    </div>
  )
}

export default Parameters
