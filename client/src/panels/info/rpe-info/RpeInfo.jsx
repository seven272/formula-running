import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './RpeInfo.module.css'
import Rpe from './rpe/Rpe'

const RpeInfo = () => {
  const routeNavigator = useRouteNavigator()
  return (
    <div className={styles.rpe_info}>
      <div className={styles.wrap}>
        <button
          className={styles.btn_back}
          onClick={() => routeNavigator.back()}
        >
          <BsBoxArrowInLeft className={styles.btn_icon} />
          назад
        </button>
        <h3 className={styles.title}>PRE что это такое?</h3>
        <span className={styles.descr}>
          RPE, или показатель воспринимаемого напряжения, — это шкала,
          используемая для определения интенсивности тренировки в
          зависимости от степени вашей напряжённости. Шкала RPE обычно
          варьируется от 0 до 10, где ноль означает буквально полное
          отсутствие нагрузки (вы лежите на диване), а 10 — самое
          тяжёлое усилие, которое вы едва-едва можете выдержать. RPE
          это субьективная оценка того насколько тяжело дается вам
          тренировка в конкретный день. Одно и то же усилие в разные
          дни может восприниматься как более тяжёлое или более лёгкое
          — из-за усталости, болезни, погоды и т. д. Даже
          психологическая/умственная усталость делает тренировку
          тяжелее. Вот почему RPE обычно используется как один из
          показателей среди множества инструментов, помогающих
          оптимизировать тренировки.
        </span>
        <Rpe />
      </div>
    </div>
  )
}

export default RpeInfo
