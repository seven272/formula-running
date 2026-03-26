import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoPencil } from 'react-icons/go'

// import { addRecords } from '../../../redux/slices/userSlice'
import { fetchRecordsUser } from '../../../redux/slices/userSlice'
import styles from './Records.module.css'

import RecordForm from '../forms/record-form/RecordForm'

const Records = () => {
  const dispatch = useDispatch()
  const userRecords = useSelector((state) => state.user.records)

  const [showForm, setShowForm] = useState(false)

  const getDataFromForm = (payload) => {
    dispatch(fetchRecordsUser(payload))
  }

  return (
    <div className={styles.records}>
      {showForm ? (
        <RecordForm
          getDataFromForm={getDataFromForm}
          closeForm={setShowForm}
        />
      ) : (
        <>
          <span className={styles.title}>
            Лучшее время на дистанции
            <GoPencil
              className={styles.icon_edit}
              onClick={() => setShowForm(!showForm)}
            />
          </span>
          <ul className={styles.items}>
            <li className={styles.item}>
              <span className={styles.item__title}>5 км</span>
              <span className={styles.item__data}>
                {userRecords.five}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.item__title}>10 км</span>
              <span className={styles.item__data}>
                {userRecords.ten}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.item__title}>21 км</span>
              <span className={styles.item__data}>
                {userRecords.halfmarathon}
              </span>
            </li>
            <li className={styles.item}>
              <span className={styles.item__title}>42 км</span>
              <span className={styles.item__data}>
                {userRecords.marathon}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default Records
