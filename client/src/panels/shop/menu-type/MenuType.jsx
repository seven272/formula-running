import { MdOutlineMoneyOffCsred, MdReceiptLong } from 'react-icons/md'
import { MdAttachMoney } from 'react-icons/md'

import styles from './MenuType.module.css'

const MenuType = ({ filter, onSelectFilter }) => {
  
  const getAllPlans = (value) => {
    onSelectFilter(value)
  }

  const getFreePlans = (value) => {
    onSelectFilter(value)
  }

  const getPaidPlans = (value) => {
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
            <MdReceiptLong className={styles.icon} />
            <span className={styles.text}>все</span>
          </li>
          <li
            className={
              filter.value === 'free'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getFreePlans('free')}
          >
            <MdOutlineMoneyOffCsred className={styles.icon} />
            <span className={styles.text}>бесплатные</span>
          </li>
          <li
            className={
              filter.value === 'paid'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getPaidPlans('paid')}
          >
            <MdAttachMoney className={styles.icon} />
            <span className={styles.text}>платные</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuType
