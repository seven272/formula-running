import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CiSaveDown1 } from 'react-icons/ci'

import styles from './AgeHeightWeightForm.module.css'
import { fetchAgeHeightWeightUser} from '../../../../redux/slices/userSlice'

const AgeHeightWeightForm = ({ closeForm }) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.profile)
  const [person, setPerson] = useState({
    age: userData.age,
    weight: userData.weight,
    height: userData.height,
  })



  const handleInputAge = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/[^\d\.]/g, '')
      .substr(0, 3)

    setPerson({ ...person, age: evt.target.value })
  }

  const handleInputHeight = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value 
      .replace(/[^\d\.]/g, '')
      .substr(0, 3)
    setPerson({ ...person, height: evt.target.value })
  }

  const handleInputWeight = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/[^\d\.]/g, '')
      .substr(0, 3)

    setPerson({ ...person, weight: evt.target.value })
  }

  const handleSavePerson = () => {
    setPerson(person)
    dispatch(fetchAgeHeightWeightUser(person))
    closeForm(false)
  }
  return (
    <div className={styles.form}>

      <label htmlFor="age" className={styles.input_label_text}>
        <span className={styles.input_title}>Возраст</span>

        <input
          type="text"
          className={styles.input_field_text}
          id="age"
          placeholder="ваш возраст..."
          value={person.age}
          onChange={handleInputAge}
        />
        <span className={styles.input_error}></span>
      </label>

      <label htmlFor="height" className={styles.input_label_text}>
        <span className={styles.input_title}>Рост</span>
        <input
          type="text"
          className={styles.input_field_text}
          id="height"
          placeholder="введите рост в см..."
          value={person.height}
          onChange={handleInputHeight}
        />
        <span className={styles.input_error}></span>
      </label>

      <label htmlFor="weight" className={styles.input_label_text}>
        <span className={styles.input_title}>Вес</span>
        <input
          type="text"
          className={styles.input_field_text}
          id="weight"
          placeholder="введите вес в кг..."
          value={person.weight}
          onChange={handleInputWeight}
        />
        <span className={styles.input_error}></span>
      </label>

      <button className={styles.btn_save} onClick={handleSavePerson}>
        <CiSaveDown1 className={styles.icon_save} />
        Сохранить и закрыть
      </button>
    </div>
  )
}
export default AgeHeightWeightForm