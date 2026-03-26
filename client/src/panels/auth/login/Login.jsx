import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './Login.module.css'
import { loginUser } from '../../../redux/slices/authSlice'

const Login = ({ show }) => {
  const dispatch = useDispatch() 
  const routeNavigator = useRouteNavigator()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    dispatch(loginUser({ username, password }))
    routeNavigator.push('/profile')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Авторизация</h1>

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
          minLength={1}
          maxLength={20}
          value={username}
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

        <div className={styles.wrap}>
          <button className={styles.button} onClick={handleLogin}>
            Войти в систему
          </button>
        </div>
      </form>

      <span className={styles.footer}>
        Нет регистрации?
        <p
          className={styles.footer_link}
          onClick={() => show('register')}
        >
          создать аккуант
        </p>
      </span>
    </div>
  )
}

export default Login
