import React from 'react'

import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from 'react-icons/tb'

import styles from './GenerateHeader.module.css'

const GenerateHeader = () => {
  return (
    <div className={styles.main_gh}>
      <span className={styles.title}>Генератор беговых планов</span>
      <h3 className={styles.subtitle}>
        для дистаниций: 10км, 21км и марафона
      </h3>
      <span className={styles.descr}>
        создайте свой персональный беговой план с учетом желаемой
        дистанции, уровня подготовки и располагаемого свободного
        времени
      </span>
      <h3 className={styles.subtitle}>
        Как работает генератор беговых планов
      </h3>
      <ul className={styles.items}>
        <li className={styles.item}>
          <TbCircleNumber1 className={styles.item_number} />

          <div className={styles.item_wrap}>
            <span className={styles.item_title}>
              Выберите дистанцию и время финиша
            </span>
            <span className={styles.item_descr}>
              К чему вы готовитесь: 5 км, 10 км, полумарафон или
              марафон? Выберите дистанцию и укажите время с которым
              хотели бы ее пробежать
            </span>
          </div>
        </li>

        <li className={styles.item}>
          <TbCircleNumber2 className={styles.item_number} />
          <div className={styles.item_wrap}>
            <span className={styles.item_title}>
              Настройте свое расписание
            </span>
            <span className={styles.item_descr}>
              Выберите доступные тренированчые дни, укажите в какой из
              них будет длительная пробежка и добавьте силовые
              тренировки
            </span>
          </div>
        </li>

        <li className={styles.item}>
          <TbCircleNumber3 className={styles.item_number} />
          <div className={styles.item_wrap}>
            <span className={styles.item_title}>
              Получите свой беговой план
            </span>
            <span className={styles.item_descr}>
              Сбалансированный беговой план с легкими пробежками,
              темповыми работами и интервальными тренировками
              созданный под ваши запросы.
            </span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default GenerateHeader
