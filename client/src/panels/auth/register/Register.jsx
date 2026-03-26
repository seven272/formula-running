import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './Register.module.css'
import { registerUser } from '../../../redux/slices/authSlice'

const Register = ({ show }) => {
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  const handleRegister = () => {
    dispatch(registerUser({ username, password, code }))
    setPassword('')
    setUsername('')
    setCode('')
    routeNavigator.push('/profile')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Регистрация</h1>

      <form
        action=""
        className={styles.form}
        onSubmit={(evt) => evt.preventDefault()}
      >
        <label htmlFor="first" className={styles.label}>
          Логин:
        </label>
        <input
          className={styles.input}
          type="text"
          id="first"
          name="first"
          placeholder="Введите ваш логин"
          required
          value={username}
          minLength={1}
          maxLength={20}
          onChange={(evt) => setUsername(evt.target.value)}
        />

        <label htmlFor="password" className={styles.label}>
          Пароль:
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
          placeholder="Введите ваш пароль"
          required
            minLength={1}
          maxLength={20}
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />

        <label htmlFor="code" className={styles.label}>
          Код:
        </label>
        <input
          className={styles.input}
          type="text"
          id="code"
          name="code"
          placeholder="Введите код"
          required
            minLength={1}
          maxLength={20}
          value={code}
          onChange={(evt) => setCode(evt.target.value)}
        />

        <div className={styles.wrap}>
          <button
            type="submit"
            className={styles.button}
            onClick={handleRegister}
          >
            Отправить
          </button>
        </div>
      </form>
      <span className={styles.footer}>
        Уже зарегистрированы?
        <p
          className={styles.footer_link}
          onClick={() => show('login')}
        >
          войти в аккуант
        </p>
      </span>
    </div>
  )
}

export default Register
