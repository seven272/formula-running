import { useEffect, useState } from 'react'
import { useHref, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'

import styles from './Header.module.css'
import Menu from './menu/Menu'
import Logo from './logo/Logo'
import ContentHeader from './content-header/ContentHeader'

const Header = () => {
  const { panel } = useActiveVkuiLocation()
  const pageUrl = useHref() // /#/
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
        <Logo />
        <Menu />
        {isMain && <ContentHeader />}
      </div>
    </div>
  )
}

export default Header
