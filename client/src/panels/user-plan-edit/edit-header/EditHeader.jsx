import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import styles from './EditHeader.module.css'

const EditHeader = () => {
  return (
    <div className={styles.main_edit_header}>
      <span className={styles.text}>
        Вы можете внести изменения и отредактировать любую тренировку
        в плане нажав на иконку <FaPencilAlt size={20} />
      </span>
    </div>
  )
}

export default EditHeader
