import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'

import styles from './PulseAuto.module.css'
import { fetchPulsesUser } from '../../../../../redux/slices/userSlice'

const PulseAuto = ({ showForm }) => {
  const dispatch = useDispatch()
  const [maxPulse, setMaxPulse] = useState('')
  const [showMaxPulse, setShowMaxPulse] = useState(false)

  const getMaxPulse = (evt) => {
    evt.target.value = evt.target.value
      .replace(/[^\d\.]/g, '')
      .substr(0, 3)
    setMaxPulse(Number(evt.target.value))
  }

  const countPulse = (evt) => {
    evt.preventDefault()
    const arrPulseParam = [50, 59, 60, 69, 70, 79, 80, 89, 90, 100]
    const arrNewPulseZone = arrPulseParam.map((item) => {
      return Math.round((item / 100) * maxPulse)
    })

    const pulses = {
      zone1: `${arrNewPulseZone[0]}-${arrNewPulseZone[1]}`,
      zone2: `${arrNewPulseZone[2]}-${arrNewPulseZone[3]}`,
      zone3: `${arrNewPulseZone[4]}-${arrNewPulseZone[5]}`,
      zone4: `${arrNewPulseZone[6]}-${arrNewPulseZone[7]}`,
      zone5: `${arrNewPulseZone[8]}-${arrNewPulseZone[9]}`,
    }
    dispatch(fetchPulsesUser(pulses))
    setShowMaxPulse(true)
  }

  return (
    <form className={styles.form__pulse_auto}>
      <label className={styles.pulse_auto_label}>
        <span className={styles.pulse_auto_title}>
          Максимальный пульс
        </span>
        <input
          className={styles.pulse_auto_field}
          type="text"
          placeholder="пульс..."
          value={maxPulse}
          onChange={getMaxPulse}
        />
        <button className={styles.btn_count} onClick={countPulse}>
          Расcчитать
        </button>
      </label>
      {showMaxPulse && (
        <span className={styles.form__pulse_result}>
          Пульсовые зоны успешно рассчитаны
        </span>
      )}
      <button
        className={styles.btn_close} 
        onClick={() => showForm(false)}
      >
        <IoCloseOutline className={styles.icon_close} />
        закрыть
      </button>
    </form>
  )
}

export default PulseAuto
