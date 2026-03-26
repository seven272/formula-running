import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CiSaveDown1 } from 'react-icons/ci'

import styles from './PulseHandle.module.css'
import { fetchPulsesUser } from '../../../../../redux/slices/userSlice'

const PulseHandle = ({ showForm }) => {
  const dispatch = useDispatch()
  const zonesPulse = useSelector((state) => state.user.pulses)
  const [pulses, setPulses] = useState({
    ...zonesPulse,
  })

  const handlePulseZone = (evt) => {
    evt.target.value = evt.target.value
      .replace(/^[a-zа-яё0-9]{3``,}$/i)
      .substr(0, 15)

    switch (evt.target.name) {
      case 'zone1':
        return setPulses({ ...pulses, zone1: evt.target.value })
      case 'zone2':
        return setPulses({ ...pulses, zone2: evt.target.value })
      case 'zone3':
        return setPulses({ ...pulses, zone3: evt.target.value })
      case 'zone4':
        return setPulses({ ...pulses, zone4: evt.target.value })
      case 'zone5':
        return setPulses({ ...pulses, zone5: evt.target.value })
      default:
        return setPulses({ ...pulses })
    }
  }

  const saveHandlePulseZone = () => {
    dispatch(fetchPulsesUser(pulses))
    showForm(false)
  }

  return (
    <div className={styles.pulse_handle}>
      <h3 className={styles.title}>Ввести пульс вручную</h3>
      <ul className={styles.pulse__items}>
        <li className={styles.pulse__item}>
          <span className={styles.pulse__item_title}>
            Очень легко
          </span>

          <label className={styles.pulse_label_handle}>от и до</label>
          <input
            className={styles.pulse_field_handle}
            type="text"
            name="zone1"
            placeholder="например, 115-130"
            value={pulses.zone1}
            onChange={handlePulseZone}
          />
        </li>
        <li className={styles.pulse__item}>
          <span className={styles.pulse__item_title}>Легко</span>

          <label className={styles.pulse_label_handle}>от и до</label>
          <input
            className={styles.pulse_field_handle}
            type="text"
            name="zone2"
            placeholder="например, 130-150"
            value={pulses.zone2}
            onChange={handlePulseZone}
          />
        </li>
        <li className={styles.pulse__item}>
          <span className={styles.pulse__item_title}>
            Средние усилия
          </span>

          <label className={styles.pulse_label_handle}>от и до</label>
          <input
            className={styles.pulse_field_handle}
            type="text"
            name="zone3"
            placeholder="например, 150-170"
            value={pulses.zone3}
            onChange={handlePulseZone}
          />
        </li>
        <li className={styles.pulse__item}>
          <span className={styles.pulse__item_title}>Интенсивно</span>

          <label className={styles.pulse_label_handle}>от и до</label>
          <input
            className={styles.pulse_field_handle}
            type="text"
            name="zone4"
            placeholder="например, 170-190"
            value={pulses.zone4}
            onChange={handlePulseZone}
          />
        </li>
        <li className={styles.pulse__item}>
          <span className={styles.pulse__item_title}>Максимум</span>

          <label className={styles.pulse_label_handle}>от и до</label>
          <input
            className={styles.pulse_field_handle}
            type="text"
            name="zone5"
            placeholder="например, 190-210"
            value={pulses.zone5}
            onChange={handlePulseZone}
          />
        </li>
      </ul>
      <button
        className={styles.btn_save}
        onClick={saveHandlePulseZone}
      >
        <CiSaveDown1 className={styles.icon_save} />
        Сохранить и закрыть
      </button>
    </div>
  )
}
export default PulseHandle
