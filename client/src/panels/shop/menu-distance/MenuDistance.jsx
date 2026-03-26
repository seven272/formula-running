import { TbRun } from 'react-icons/tb'

import styles from './MenuDistance.module.css'

const MenuDistance = ({ filter, onSelectFilter }) => {
  return (
    <div className={styles.sort_plans}>
      <div className={styles.menu_sort}>
        <span className={styles.title}>по дистанциям:</span>
        <ul className={styles.items}>
           {['5км', '10км', '21км', '42км'].map((dist) => (
            <li
              key={dist}
              className={filter.value === dist ? styles.item_active : styles.item}
              onClick={() => onSelectFilter(dist)}
            >
              <TbRun className={styles.icon} />
              <span className={styles.text}>{dist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuDistance
