import { useEffect, useState } from 'react'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'

import styles from './Header.module.css'
import Menu from './menu/Menu'
import Logo from './logo/Logo'
import ContentHeader from './content-header/ContentHeader'
import UserStatus from '../user-status/UserStatus'

const Header = () => {
  const { panel } = useActiveVkuiLocation()
  const [isMain, setIsMain] = useState(true)

  useEffect(() => {
    if (panel === 'main_panel') {
      setIsMain(true)
    } else {
      setIsMain(false)
    }
  }, [panel])

  return (
    <div
      className={isMain ? styles.header_main : styles.header_other}
    >
      <div className={styles.wrapper}>
        <div className={styles.top_block}>
          <Logo />
          <UserStatus />
        </div>

        <Menu />
        {isMain && <ContentHeader />}
      </div>
    </div>
  )
}

export default Header
