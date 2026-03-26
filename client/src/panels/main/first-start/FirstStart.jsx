import React from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { TbUserEdit } from 'react-icons/tb'
import { LuGitPullRequestCreateArrow } from 'react-icons/lu'
import { LiaShoppingBasketSolid } from 'react-icons/lia'

import styles from './FirstStart.module.css'
import Img from '../../../assets/images/components/main/main6.jpeg'

const FirstStart = () => {
  const routerNavigator = useRouteNavigator()
  return (
    <div className={styles.main_first_start}>
     
      <div className={styles.btn_wrap}>
        <div
          className={styles.btn}
          onClick={() => routerNavigator.push('/shop')}
        >
             <LiaShoppingBasketSolid size={20} className={styles.icon} />
          <span className={styles.text}>готовые беговые планы</span>
       
        </div>

        <div
          className={styles.btn}
          onClick={() => routerNavigator.push('/generate')}
        >
            <LuGitPullRequestCreateArrow
            size={18}
            className={styles.icon}
          />
          <span className={styles.text}>
            генератор беговых планов
          </span>
        
        </div>

        <div
          className={styles.btn}
          onClick={() => routerNavigator.push('/profile')}
        >
          <TbUserEdit size={18} className={styles.icon} />
          <span className={styles.text}>
            создать спортивный профиль
          </span>
          
        </div>
      </div>
      <div className={styles.img_wrap}>
        <img className={styles.img} src={Img} alt='банер главной страницы'/>
      </div>

    </div>
  )
}

export default FirstStart
