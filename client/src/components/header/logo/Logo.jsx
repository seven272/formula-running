import { useSelector } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { CiLogin, CiLogout } from 'react-icons/ci'
import LogoIcon from '../../../assets/images/ai/logo.jpeg'

import styles from './Logo.module.css'
import { checkIsAuth } from '../../../redux/slices/authSlice'

const Logo = () => {
  const isAuth = useSelector(checkIsAuth)

  const routeNavigator = useRouteNavigator()
  return (
    <div className={styles.main}>
      <div className={styles.logo_wrap}>
        <div
          className={styles.icon_wrap}
          onClick={() => routeNavigator.push('/')}
        >
          <img
            src={LogoIcon}
            alt="икока логтипа"
            className={styles.icon}
          />
        </div>
        <span className={styles.title}>Формула бега</span>
      </div>
      {isAuth ? (
        <CiLogout
          className={styles.auth_icon}
          onClick={() => routeNavigator.push('/auth')}
        />
      ) : (
        <CiLogin
          className={styles.auth_icon}
          onClick={() => routeNavigator.push('/auth')}
        />
      )}
    </div>
  )
}

export default Logo
