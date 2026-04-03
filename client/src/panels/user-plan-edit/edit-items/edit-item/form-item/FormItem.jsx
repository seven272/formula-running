import { useState } from 'react'

import styles from './FormItem.module.css'

const FormItem = ({ openForm, data }) => {
  console.log('Полные данные дня')
  console.log(data)
  const [workout, setWorkout] = useState({
    title: data.title,
    descr: data.descr,
  })

  const handleEditWorkout = (evt) => {
    const { name, value } = evt.target
    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveWorkout = () => {
    const newData = {
      ...data,
      title: workout.title,
      descr: workout.descr,
    }
    console.log(newData)
  }

  return (
    <div className={styles.main_form_item}>
      <div className={styles.inputs_wrap}>
        <label className={`${styles.label} ${styles.label_title}`}>
          <span>Название</span>
          <input
            type="text"
            name="title"
            className={`${styles.input} ${styles.input_title}`}
            value={workout.title}
            onChange={handleEditWorkout}
          />
        </label>

        <label className={`${styles.label} ${styles.label_descr}`}>
          <span>Описание</span>
          <input
            type="text"
            name="descr"
            className={`${styles.input} ${styles.input_descr}`}
            value={workout.descr}
            onChange={handleEditWorkout}
          />
        </label>
      </div>
      <div className={styles.btns_wrap}>
        <button
          className={styles.btn_cancel}
          onClick={() => openForm(false)}
        >
          Отменить
        </button>
        <button className={styles.btn_save} onClick={saveWorkout}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default FormItem
