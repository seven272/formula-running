import React, { useState } from 'react'
import styles from './Input.module.css'
import { useInput } from '../../utils/useValidation'

const Input = ({ myId, myType, myClass, myValue, getData, ...attrs }) => {
  // хук для валидации поля (проверка на ошибки)
  const validInput = useInput('')
  const [inputValue, setInputValue] = useState(myValue)

  const handleInputValue = (evt) => {
    setInputValue(evt.target.value)
    validInput.onChange(evt.target.value) 

    getData({ name: evt.target.name, value: evt.target.value })
  }

  return (
    <div className={styles[`input_${myClass}`]}>
      <div className={styles.input_wrapper}>
        <label
          htmlFor={myId}
          className={styles[`input_label_${myClass}`]}
        >
          {attrs.myLabel}
        </label>
        <input
          id={myId}
          name={myId}
          className={styles[`input_field_${myClass}`]}
          type={myType}
          step={1}
          placeholder={attrs.plchl}
          value={inputValue}
          onChange={handleInputValue}
          onBlur={(evt) => validInput.onBlur(evt.target.value)}
          onFocus={() => validInput.onFocus(myType)}
        />
      </div>

      <span className={styles.input_error}>
        {validInput.textError}
      </span>
    </div>
  )
}

export default Input
