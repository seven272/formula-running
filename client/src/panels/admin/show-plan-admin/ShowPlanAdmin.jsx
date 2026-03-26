import React from 'react'

import styles from './ShowPlanAdmin.module.css'

const ShowPlanAdmin = ({ plan, closeFn }) => {
  const {
    _id,
    title,
    subtitle,
    typeSport,
    distance,
    period,
    planUrl,
    pictureUrl,
    isFree,
    workouts,
  } = plan

  const workoutsJson = JSON.stringify(workouts)

  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={closeFn}>
        Закрыть
      </button>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>ID:</span>
        <span className={styles.descr}>{_id}</span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Название:</span>
        <span className={styles.descr}>{title}</span>
      </div>

      <div className={styles.wrap}>
        <span className={styles.subtitle}>Описание:</span>
        <span className={styles.descr}>{subtitle}</span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Вид спорта:</span>
        <span className={styles.descr}>{typeSport}</span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Дистанция:</span>
        <span className={styles.descr}>{distance}</span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Длительность:</span>
        <span className={styles.descr}>{period}</span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Стоимость:</span>
        <span className={styles.descr}>
          {isFree ? 'Бесплатный' : 'Платный'}
        </span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Изображение:</span>
        <span className={styles.descr}>
          {pictureUrl === '' ? (
            'Нет изображения'
          ) : (
            <>
              <span className={styles.image_text}>{pictureUrl}</span>
              <div className={styles.image_wrap}> 
                <img
                  className={styles.image}
                  src={`http://localhost:5010/${pictureUrl}`}
                  alt="изображение плана"
                />
              </div>
            </>
          )}
        </span>
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>PDF версия плана:</span>

        {planUrl === '' ? (
          'Нет pdf файла'
        ) : (
          <span className={styles.descr}>{planUrl}</span>
        )}
      </div>
      <div className={styles.wrap}>
        <span className={styles.subtitle}>Тренировки:</span>
        <span className={styles.descr}>{workoutsJson}</span>
      </div>
    </div>
  )
}

export default ShowPlanAdmin
