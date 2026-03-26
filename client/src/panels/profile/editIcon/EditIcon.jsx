import React, { useEffect, useState } from 'react'
import { CiSaveDown1 } from 'react-icons/ci'
import styles from './EditIcon.module.css'

const EditIcon = ({ whatText, getIsShowForm }) => {
  const [show, setShow] = useState(true)

  const handleShowForm = () => {
    setShow((prev) => {
      return !prev
    })
    getIsShowForm(!show)
  }

  useEffect(() => {
    setShow(whatText)
  }, [whatText])

  return (
    <div
      className={styles.edit_wrapper}
      onClick={() => handleShowForm()}
    >
      {show && (
        <>
          <CiSaveDown1 className={styles.edit_icon} />
          <span className={styles.edit_text}>
            сохранить и закрыть
          </span>
        </>
      )}
    </div>
  )
}

export default EditIcon
