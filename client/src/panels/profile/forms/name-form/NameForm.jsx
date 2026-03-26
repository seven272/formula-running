import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CiSaveDown1 } from 'react-icons/ci'
 
import styles from './NameForm.module.css'
import { fetchNameUser } from '../../../../redux/slices/userSlice'

const NameForm = ({ closeForm }) => {
  const dispatch = useDispatch()
  const { name } = useSelector((state) => state.user)
  const [nameUser, setNameUser] = useState(name || '')
 
  const handleInputName = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/^\s+|[^A-ZА-ЯЁ\s]/gi, '')
      .substr(0, 30)

    setNameUser(evt.target.value)
  }

 
  const handleSavePerson = () => {
    dispatch(fetchNameUser(nameUser))
    closeForm(false)
  }
  return (
    <div className={styles.form}>
      <label htmlFor="fio" className={styles.input_label_text}>
        <span className={styles.input_title}>Имя и Фамилия</span>
        <input
          type="text"
          className={styles.input_field_text}
          id="fio"
          placeholder="введите имя..."
          value={nameUser}
          onChange={handleInputName}
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

export default NameForm
