import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { GoPencil } from 'react-icons/go'

import styles from './Pulse.module.css'
import PulseForm from '../forms/pulse-form/PulseForm'

const Pulse = () => {
  const pulses = useSelector((state) => state.user.pulses)
  const [showForm, setShowForm] = useState(false)

 
 
  return (
    <div className={styles.pulse}>
      {showForm ? (
        <PulseForm
          showForm={setShowForm}
        />
      ) : (
        <>
          <span className={styles.title}>
            Пульсовые зоны{' '}
            <GoPencil
              className={styles.icon_edit}
              onClick={() => setShowForm(true)}
            />
          </span>
          <ul className={styles.items}>
            <li className={styles.item}>
              <span
                className={`${styles.item__title} ${styles.item__header}`}
              >
                Зона
              </span>
              <span
                className={`${styles.item__title} ${styles.item__header}`}
              >
                Пульс,
                <span style={{ fontSize: '10px' }}>уд в мин</span>
              </span>
              <span
                className={`${styles.item__title} ${styles.item__header}`}
              >
                % от максимума
              </span>
            </li>
            <li
              className={styles.item}
              style={{
                backgroundColor: 'rgba( 187, 192, 201 , 0.5)',
              }}
            >
              <span className={styles.item__title}>Очень легко</span>
              <span className={styles.item__pulse}>
                {pulses.zone1}
              </span>
              <span className={styles.item__percent}>50-59</span>
            </li>
            <li
              className={styles.item}
              style={{
                backgroundColor: 'rgba(18, 85, 182, 0.5)',
              }}
            >
              <span className={styles.item__title}>Легко</span>
              <span className={styles.item__pulse}>
                {pulses.zone2}
              </span>
              <span className={styles.item__percent}>60-69</span>
            </li>
            <li
              className={styles.item}
              style={{ backgroundColor: 'rgba( 15, 196, 15, 0.5)' }}
            >
              <span className={styles.item__title}>
                Средние усилия
              </span>
              <span className={styles.item__pulse}>
                {pulses.zone3}
              </span>
              <span className={styles.item__percent}>70-79</span>
            </li>
            <li
              className={styles.item}
              style={{ backgroundColor: 'rgba(  228, 245, 11, 0.5)' }}
            >
              <span className={styles.item__title}>Интенсивно</span>
              <span className={styles.item__pulse}>
                {pulses.zone4}
              </span>
              <span className={styles.item__percent}>80-89</span>
            </li>
            <li
              className={styles.item}
              style={{
                backgroundColor: 'rgba(247, 38, 10 , 0.5)',
              }}
            >
              <span className={styles.item__title}>Максимум</span>
              <span className={styles.item__pulse}>
                {pulses.zone5}
              </span>
              <span className={styles.item__percent}>90-100</span>
            </li>
          </ul>
        </>
      )}

    
    </div>
  )
}

export default Pulse
