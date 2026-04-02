import React, { useEffect, useState } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import { FaRegStar } from 'react-icons/fa6'
import { GiThreeFriends } from 'react-icons/gi'
import { GrInfo } from 'react-icons/gr'
import { TbMessageUser } from 'react-icons/tb'
import styles from './Footer.module.css'
import {
  shareApp,
  recommendApp,
  addFavoriteApp,
} from '../../utils/vkAppShare'

const Footer = () => {
  const routerNavigator = useRouteNavigator()
  const urlApp = 'https://vk.com/app53406141'
  const [year, setYear] = useState('')
  //Получаем текущий год
  useEffect(() => {
    const dateObj = new Date()
    const yearNow = dateObj.getUTCFullYear()
    setYear(yearNow)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.icons_wrapper}>
        <GrInfo
          title="полезная информация"
          className={styles.icon}
          onClick={() => routerNavigator.replace('/info')}
        />
        <TbMessageUser
          title="поделиться приложением"
          className={styles.icon}
          onClick={() => shareApp(urlApp)}
        />
        <GiThreeFriends
          title="рекомендовать друзьям"
          className={styles.icon}
          onClick={() => recommendApp()}
        />

        <FaRegStar
          title="добавить в избранное"
          className={styles.icon}
          onClick={() => addFavoriteApp()}
        />
      </div>
      <span className={styles.text}>&#169; {year}</span>
    </footer>
  )
}

export default Footer
