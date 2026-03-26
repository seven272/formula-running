import React from 'react'
import { useSelector } from 'react-redux'
import { MdDarkMode } from 'react-icons/md'
import { IoIosSunny } from 'react-icons/io'
import { CgToggleOff, CgToggleOn } from 'react-icons/cg'

import styles from './ToggleTheme.module.css'
import useTheme from '../../../utils/useTheme'

const ToggleTheme = () => {
  const { toggleTheme } = useTheme()
  const theme = useSelector((state) => state.theme.userTheme)

  const onSwitchTheme = () => { 
    toggleTheme() 
  }

  return (
    <div className={styles.theme_wrapper} onClick={onSwitchTheme}>
      <IoIosSunny className={`${styles.icon} ${styles.icon_theme}`} />
      {theme === 'dark' ? (
        <CgToggleOff
          className={`${styles.icon} ${styles.icon_toggle}`}
        />
      ) : (
        <CgToggleOn
          className={`${styles.icon} ${styles.icon_toggle}`}
        /> 
      )}

      <MdDarkMode className={`${styles.icon} ${styles.icon_theme}`} />
    </div>
  )
}

export default ToggleTheme
