import { GoPlusCircle } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import { IoListCircleOutline } from "react-icons/io5";

import styles from './MenuType.module.css'

const MenuType = ({ filter, onSelectFilter }) => {
  
  const getAllPlans = (value) => {
    onSelectFilter(value)
  }

  const getUnavailablePlans = (value) => {
    onSelectFilter(value)
  } 

  const getAvailablePlans = (value) => {
    onSelectFilter(value)
  }

  return (
    <div className={styles.sort_plans}>
      <div className={styles.menu_sort}>
        <span className={styles.title}>показать:</span>
        <ul className={styles.items}>
          <li
            className={
              filter.value === 'all'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getAllPlans('all')}
          >
            <IoListCircleOutline className={styles.icon} />
            <span className={styles.text}>все</span>
          </li>
          <li
            className={
              filter.value === 'unavailable'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getUnavailablePlans('unavailable')}
          >
            <FiCheckCircle className={styles.icon} />
            <span className={styles.text}>активированные</span>
          </li>
          <li
            className={
              filter.value === 'available'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getAvailablePlans('available')}
          >
            <GoPlusCircle className={styles.icon} />
            <span className={styles.text}>доступные</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuType
