import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './Carousel.module.css'
import { PiCirclesThreeFill } from 'react-icons/pi'
import { PiPersonSimpleBikeBold } from 'react-icons/pi'
import { MdOutlineTouchApp } from 'react-icons/md'
import { MdRunCircle } from 'react-icons/md'
import { GiRunningShoe } from 'react-icons/gi'

const Carousel = () => { 
  const routerNavigator = useRouteNavigator()
  const settings = {
    className: 'center',
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
  }
  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <div
          className={styles.block_content_1}
          onClick={() => routerNavigator.go('/info/rpe')}
        >
          <MdRunCircle className={styles.icon_top} />
          <span className={styles.title}>забег на 5 км</span>
          {/* <span className={styles.descr}>
            Первые 5км всегда волнительны и запоминающиеся. Эту
            дистанцию можно считать первой ступенькой любительском
            беге...
          </span> */}

          <MdOutlineTouchApp className={styles.icon_bottom} />
        </div>

        <div
          className={styles.block_content_2}
          onClick={() => routerNavigator.go('/info/rpe')}
        >
          <GiRunningShoe className={styles.icon_top} />
          <span className={styles.title}>бежим марафон</span>
          {/* <span className={styles.descr}>
            Марафон — это испытание и серьёзная нагрузка на организм,
            поэтому он требует хорошей подготовки. Первый марафон с
            улыбкой...
          </span> */}

          <MdOutlineTouchApp className={styles.icon_bottom} />
        </div>

        <div
          className={styles.block_content_1}
          onClick={() => routerNavigator.go('/info/rpe')}
        >
          <PiPersonSimpleBikeBold className={styles.icon_top} />
          <span className={styles.title}>План Ironman</span>
          {/* <span className={styles.descr}>
            Подготовка к полному Ironman требует комплексного подхода,
            который включает как физическую, так и психологическую
            подготовку...
          </span> */}

          <MdOutlineTouchApp className={styles.icon_bottom} />
        </div>

        <div
          className={styles.block_content_2}
          onClick={() => routerNavigator.go('/info/rpe')}
        >
          <PiCirclesThreeFill className={styles.icon_top} />
          <span className={styles.title}>Спринт триатлон</span>
          {/* <span className={styles.descr}>
            Знакомство с триатлоном лучше начинать с коротких
            дистанций. Этот план поможет уверенно финишировать на
            спринтерской дистанции...
          </span> */}

          <MdOutlineTouchApp className={styles.icon_bottom} />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
