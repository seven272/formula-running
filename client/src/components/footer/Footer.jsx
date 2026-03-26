import React, { useEffect, useState } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

// import { PiShareNetwork } from "react-icons/pi";
// import { GiLetterBomb } from "react-icons/gi";
import { GrInfo } from 'react-icons/gr'
import { TbMessageUser } from 'react-icons/tb'
import { LiaCreativeCommonsShare } from 'react-icons/lia'
import styles from './Footer.module.css'
import { shareApp } from '../../utils/vkAppShare'

const Footer = () => {
  const routerNavigator = useRouteNavigator()
  const urlApp = 'https://vk.com/app52023743'
  const [year, setYear] = useState('')
  //Получаем текущий год
  useEffect(() => {
    const dateObj = new Date()
    const yearNow = dateObj.getUTCFullYear()
    setYear(yearNow)
  }, [])

  return (
    <footer className={styles.footer}>
      <span className={styles.text}>&#169; {year}</span>
      <div className={styles.icons_wrapper}>
        <GrInfo
          title="полезная информация"
          className={styles.icon}
          onClick={() => routerNavigator.replace('/info')}
        />
        <LiaCreativeCommonsShare
          title="поделиться приложением"
          className={styles.icon}
          onClick={() => shareApp(urlApp)}
        />
        <a
          href="https://vk.com/studioid27"
          rel="noopener noreferrer"
          target="_blank"
          className={styles.href}
        >
          <TbMessageUser
            title="обратная связь с разработчиком"
            className={styles.icon}
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
