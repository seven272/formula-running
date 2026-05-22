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
      {/* Главный Hero-баннер сверху */}
      <div className={styles.hero_banner}>
        <img
          className={styles.img}
          src={Img}
          alt="Банер главной страницы"
        />
        <div className={styles.hero_overlay}>
          <h1 className={styles.hero_title}>Ваш беговой наставник</h1>
          <span className={styles.hero_subtitle}>
            Выбирайте готовые программы или создавайте свои под любые
            беговые цели
          </span>
        </div>
      </div>

      {/* Сетка интерактивных карточек-меню */}
      <div className={styles.grid_menu}>
        {/* Главная карточка (Главное целевое действие) */}
        <div
          className={`${styles.card} ${styles.card_primary}`}
          onClick={() => routerNavigator.push('/shop')}
        >
          <div className={styles.icon_box}>
            <LiaShoppingBasketSolid
              size={26}
              className={styles.icon}
            />
          </div>
          <div className={styles.card_info}>
            <span className={styles.text_title}>
              Готовые беговые планы
            </span>
            <span className={styles.text_desc}>
              Программы от экспертов на любые дистанции
            </span>
          </div>
        </div>

        {/* Второстепенная карточка: Генератор */}
        <div
          className={styles.card}
          onClick={() => routerNavigator.push('/generate')}
        >
          <div className={styles.icon_box}>
            <LuGitPullRequestCreateArrow
              size={22}
              className={styles.icon}
            />
          </div>
          <div className={styles.card_info}>
            <span className={styles.text_title}>
              Конструктор планов
            </span>
            <span className={styles.text_desc}>
              Создайте индивидуальный план тренировок
            </span>
          </div>
        </div>

        {/* Второстепенная карточка: Профиль */}
        <div
          className={styles.card}
          onClick={() => routerNavigator.push('/profile')}
        >
          <div className={styles.icon_box}>
            <TbUserEdit size={22} className={styles.icon} />
          </div>
          <div className={styles.card_info}>
            <span className={styles.text_title}>
              Спортивный профиль
            </span>
            <span className={styles.text_desc}>
              Настройте свои зоны пульса и текущий темп
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstStart
