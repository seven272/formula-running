import { useState } from 'react'

import styles from './FormItem.module.css'

const FormItem = ({ openForm, data, setDescr, setTitle }) => {
  console.log('Полные данные дня')
  console.log(data)
  const [workout, setWorkout] = useState({
    title: data.title,
    descr: data.descr,
  })
  const [error, setError] = useState('')

  const handleEditWorkout = (evt) => {
    const { name, value } = evt.target
    if (name === 'title' && value.length > 100) {
      setError('Максимум 100 символов!')
      return
    }
    if (name === 'descr' && value.length > 500) {
      {
        setError('Максимум 500 символов!')
        return
      }
    }
    setError('')
    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveWorkout = () => {
    if (workout.title.length < 3) {
      setError('Название слишком короткое (минимум 3 символа)')
      return
    }
    const newData = {
      ...data,
      title: workout.title,
      descr: workout.descr,
    }
    setError('')
    setTitle(workout.title)
    setDescr(workout.descr)
    openForm(false)
    console.log(newData)
  }

  return (
    <div className={styles.main_form_item}>
      <form className={styles.inputs_wrap}>
        <label className={`${styles.label} ${styles.label_title}`}>
          <span>Название</span>
          <input
            type="text"
            name="title"
            className={`${styles.input} ${styles.input_title}`}
            value={workout.title}
            onChange={handleEditWorkout}
            maxLength={100}
            minLength={3}
            required
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
            maxLength={500}
            required
          />
        </label>
      </form>
      {error && (
        <p
          style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}
        >
          {error}
        </p>
      )}
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
