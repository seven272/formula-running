
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { useDispatch,  } from 'react-redux'

import styles from './Logout.module.css'

import { logoutUser } from '../../../redux/slices/authSlice'

const Logout = () => {
  const routeNavigator = useRouteNavigator()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    routeNavigator.push('/')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Выход из системы</h1>
      <span className={styles.subtitle}>
        Если хотите покинуть сайт нажмите кнопку ниже
      </span>

      <div className={styles.wrap}>
        <button
          type="submit"
          className={styles.button}
          onClick={handleLogout}
        >
          Выйти
        </button>
      </div>
    </div>
  )
}

export default Logout
