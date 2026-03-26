import React from 'react'

import styles from './ContentHeader.module.css'
import Img from '../../../assets/images/components/header/content-header.png'
import Slider from '../../slider/Slider'

const ContentHeader = () => {
  return (
    <div className={styles.content_header}>
      <div className={styles.wrapper}>
        <Slider />
      </div>
      <div className={styles.img_wrap}>
        <img
          src={Img}
          alt="изображение для шапки"
          className={styles.img}
        />
      </div>
    </div>
  )
}

export default ContentHeader
