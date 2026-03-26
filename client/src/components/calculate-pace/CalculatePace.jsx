import { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { IoMdStopwatch } from "react-icons/io";
import { useParams } from '@vkontakte/vk-mini-apps-router'

import styles from './CalculatePace.module.css'
import useTrainingPace from '../../utils/useTrainingPace'

const CalculatePace = ({ show }) => {
  const params = useParams()
  const { calcPaces, paces } = useTrainingPace()
  const [distance, setDistance] = useState('')
  const [isDisable, setIsDisable] = useState(true)
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  })

  const handleTime = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/[^0-9]/g, '')
      .substr(0, 2)

    if (evt.target.name === 'hours') {
      setTime({ ...time, h: Number(evt.target.value) })
    } else if (evt.target.name === 'minutes') {
      setTime({ ...time, m: Number(evt.target.value) })
    } else if (evt.target.name === 'seconds') {
      setTime({ ...time, s: Number(evt.target.value) })
    }
  }

  const handleClose = () => {
    show(false)
  }

  const clickFn = () => {
    calcPaces(distance, time)
  }

  useEffect(() => {
    const handleValidate = () => {
      if (
        distance === '' ||
        (time.h === 0 && time.m === 0 && time.s === 0)
      ) {
        setIsDisable(true)
      } else {
        setIsDisable(false)
      }
    }

    handleValidate()
  }, [distance, time])
  return (
    <div className={styles.main}>
      <div className={styles.icon_wrap_close} hidden={params.alias === 'pace'}>
        <MdClose
          className={styles.icon_close}
          onClick={handleClose}
        />
      </div>
      <h3 className={styles.title}>Расчет тренировачного темпа</h3>
      <span className={`${styles.text} ${styles.subtitle_select}`}>
        Выберите дистанцию
      </span>
      <select
        value={distance}
        className={styles.select}
        name="distance1"
        onChange={(evt) => setDistance(evt.target.value)}
      >
        <option value="" disabled={true}>
          выбрать
        </option>
        <option value={'5'}>5 км</option>
        <option value={'10'}>10 км</option>
      </select>
      <span className={`${styles.text} ${styles.subtitle_inputs}`}>
        Введите ваше лучше время на этой дистанции
      </span>

      <div className={styles.inputs_wrap}>
        <label className={styles.label}>
          <span className={styles.label_text}>часы</span>
          <input
            type="text"
            name="hours"
            value={time.h}
            onChange={handleTime}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.label_text}>минуты</span>
          <input
            type="text"
            name="minutes"
            value={time.m}
            onChange={handleTime}
            min={0}
            max={59}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.label_text}>секунды</span>
          <input
            type="text"
            name="seconds"
            value={time.s}
            onChange={handleTime}
            className={styles.input}
          />
        </label>
      </div>

      <button
        onClick={clickFn}
        className={styles.btn}
        disabled={isDisable}
      >
        <IoMdStopwatch size={12}/> <span>Рассчитать темп</span>
      </button>
      {paces && (
        <ul className={styles.items}>
          <li className={styles.item}>
            <span className={styles.item_title}>Темп на 5 км</span>
            <span className={styles.item_text}>{paces.five}</span>
            <span className={styles.item_text}>{paces.five400}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.item_title}>Темп на 10 км</span>
            <span className={styles.item_text}>{paces.ten}</span>
            <span className={styles.item_text}>{paces.ten400}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.item_title}>
              Темп ПАНО /15-21км/
            </span>
            <span className={styles.item_text}>{paces.pano}</span>
            <span className={styles.item_text}>{paces.pano400}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.item_title}>
              Марафонский темп
            </span>
            <span className={styles.item_text}>{paces.marathon}</span>
            <span className={styles.item_text}>
              {paces.marathon400}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.item_title}>Длительный бег</span>
            <span className={styles.item_text}>{paces.long}</span>
            <span className={styles.item_text}>{paces.long400}</span>
          </li>
        </ul>
      )}
    </div>
  )
}

export default CalculatePace
