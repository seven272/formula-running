import React from 'react'
import { CgComment } from 'react-icons/cg'
import { MdClose } from 'react-icons/md'

import styles from './AboutPlan.module.css'

const AboutPlan = ({
  title,
  description,
  period,
  distance,
  show,
}) => {
  const handleClose = () => {
    show(false)
  }

  return (
    <div className={styles.about_plan}>
      <div className={styles.icon_wrap_about}>
        <CgComment className={styles.icon_about} />
      </div>
      <div className={styles.content_wrap}>
        <span className={styles.title}>{title}</span>
       
        <span className={styles.descr}>дистанция: {distance}</span>
        <span className={styles.descr}>
          тренировачных недель: {period}
        </span>
         {description !== '' && (
          <span className={styles.descr}>{description}</span>
        )}
      </div>
      <div className={styles.icon_wrap_close}>
        <MdClose
          className={styles.icon_close}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

export default AboutPlan
