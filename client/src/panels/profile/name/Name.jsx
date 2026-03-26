import { useSelector } from 'react-redux'

import styles from './Name.module.css'


const Name = () => {
  const { name } = useSelector((state) => state.user)

  return (
    <div className={styles.name_section}>
      <div className={styles.wrapper}>
        <span className={styles.title}>
          {name !== '' ? name : 'имя'}
        </span>
      </div>
    </div>
  )
}

export default Name
