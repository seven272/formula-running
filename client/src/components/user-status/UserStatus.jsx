import React from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import styles from './UserStatus.module.css'

const STATUS_MAP = {
  amateur: 'Физкультурник',
  athlete: 'Атлет',
  pro: 'Профи',
  champion: 'Чемпион',
}

const UserStatus = ({ userTier = 'amateur' }) => {
  const routerNavigator = useRouteNavigator()

  return (
    <div
      className={`${styles.main_user_status} ${styles[userTier]}`}
      onClick={() => routerNavigator.push('/status')}
    >
      <div className={styles.text_block}>
        <span className={styles.label}>Ваш cтатус:</span>
        <span className={styles.status_value}>
          {STATUS_MAP[userTier]}
        </span>
      </div>
      <button className={styles.change_btn}>изменить</button>
    </div>
  )
}

export default UserStatus
