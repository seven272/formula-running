
import { MdClose } from 'react-icons/md'

import styles from './ShowPace.module.css'


const ShowPace = ({ show, paces }) => {
  return (
    <div className={styles.main_paceplan}>
       <div className={styles.icon_wrap_close}>
              <MdClose
                className={styles.icon_close}
                onClick={()=> show(false)}
              />
            </div>
      <h3 className={styles.title}>темп бега</h3>
      <ul className={styles.items}>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P1</strong> - {paces.paceSlow}
            <p className={styles.substr}>восстановительный темп</p>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P2</strong> - {paces.paceLong}
            <p className={styles.substr}>длительный бег</p>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P3</strong> - {paces.paceMarathon}
            <p className={styles.substr}>марафонский темп</p>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P4</strong> - {paces.paceHalfmarathon}
            <p className={styles.substr}>темповый бег, ПАНО</p>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P5</strong> - {paces.pace10}
            <p className={styles.substr}>
              темп длинных (МПК) интервалов
            </p>
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.item_text}>
            <strong>P6</strong> - {paces.pace5}
            <p className={styles.substr}>
              темп для коротких интервалов
            </p>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default ShowPace
