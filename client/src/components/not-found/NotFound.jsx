import React from 'react'
import { TbError404 } from 'react-icons/tb'

import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        {/* <h1 className={styles.title}>Страницы не существует</h1> */}
        <TbError404 size={300} className={styles.icon} />
      </div>
    </div>
  )
}

export default NotFound
