import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

import styles from './ChooseTypeCount.module.css'

const ChooseTypeCount = ({ howCount, show, showForm }) => {

  const handleCloseModule = () => {
    show(false)
    showForm(false)
  }
  return (
    <div className={styles.section_type_count}>
      <span className={styles.title}>
        Как будем рассчитывать пульс?
      </span>
      <div className={styles.btn_wrap}>
        <button
          className={styles.btn}
          onClick={() => howCount('auto')}
        >
          Автоматически
        </button>
        <button
          className={styles.btn}
          onClick={() => howCount('handle')}
        >
          Вводить вручную
        </button>
      </div>
       <button
             className={styles.btn_close}
             onClick={handleCloseModule}
           >
             <IoCloseOutline className={styles.icon_close} />
             закрыть
           </button>
    </div>
  )
}

export default ChooseTypeCount
