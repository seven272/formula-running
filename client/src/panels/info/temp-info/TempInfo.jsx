import { useState } from 'react'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { GrInfo } from 'react-icons/gr'

import styles from './TempInfo.module.css'
import CalculatePace from '../../../components/calculate-pace/CalculatePace'

const TempInfo = () => {
  const routeNavigator = useRouteNavigator()
  const [showBlock, setShowBlock] = useState(false)
  return (
    <div className={styles.temp_info}>
      <div className={styles.wrap}>
        <button
          className={styles.btn_back}
          onClick={() => routeNavigator.back()}
        >
          <BsBoxArrowInLeft className={styles.btn_icon} />
          назад
        </button>
        <h3 className={styles.title}>Темп бега</h3>
        <span className={styles.descr}>
          <p className={styles.descr_p}>
            Важно подбирать темп в зависимости от цели каждой
            пробежки. Существуют различные типы пробежек: длинные,
            скоростные и восстановительные. Очень важно использовать
            все типы в своем тренировачном процессе. Бег в
            разном темпе задействует и развивает разные группы мышц и
            энергетические системы. Чередование интенсивности и
            восстановления — ключ к прогрессу.
          </p>

          <CalculatePace />

          <span
            className={styles.advice_title}
            onClick={() =>
              setShowBlock((prev) => {
                return !prev
              })
            }
          >
            <GrInfo size={15} className={styles.icon} />
            Как еще можно определить свой ПАНО?
          </span>
          {showBlock && (
            <div className={styles.advice_wrap}>
              <p>
                - Темп анаэробного порога примерно соответствует
                соревновательному темпу на 15-21 км.{' '}
              </p>
              <p>
                - Соответствующий темп можно также найти по
                показателям ЧСС. Темп анаэробного порога обычно
                достигается при пульсе около 85-92% от максимальной
                ЧСС.
              </p>
              <p>
                - Использовать разговорный тест. Бегите в темпе, при
                котором вы не можете вести полноценный разговор, но
                можете произнести короткие фразы состоящие из
                трех-четырех слов. Если говорить становится слишком
                тяжело или вы не можете говорить вовсе — вы перешли
                порог ПАНО. Это хороший ориентир для определения
                вашего порога. Можете запомнить время или пульс в этот
                момент. Время нужно, чтобы в спокойных условиях
                посмотреть темп и пульс более точно.
              </p>
              <p>
                - В лабораторных условиях или с помощью лактометра.
              </p>
            </div>
          )}
        </span>
      </div>
    </div>
  )
}

export default TempInfo
