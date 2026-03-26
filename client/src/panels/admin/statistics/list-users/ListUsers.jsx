import React from 'react'

import styles from './ListUsers.module.css'

const ListUsers = ({ users }) => {
  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Список пользователей</h3>
      <ul className={styles.items}>
        {users.map((user) => {
          return (
            <li className={styles.item} key={user._id}>
              <span className={styles.text}>
                <strong>id:</strong> <span>{user._id}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>vk id:</strong> <span>{user.vkId}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>имя:</strong> <span>{user.name}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>купленные планы:</strong>{' '}
                {user.purchasedCopiedPlans.map((elem) => (
                  <span key={elem}>{elem}, </span>
                ))}
              </span>
              <span className={styles.text}>
                <strong>созданные планы:</strong>{' '}
                {user.customPlans.map((elem) => (
                  <span key={elem}>{elem}, </span>
                ))}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListUsers
