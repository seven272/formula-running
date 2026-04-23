import React from 'react'

import ItemPlan from './item-plan/ItemPlan'
import styles from './ListPurchased.module.css'

const ListPurchased = ({ list }) => {
  
  return (
    <div className={styles.list_plans}>
      <span className={styles.title}>Готовые планы</span>
      {list && list.length > 0 ? (
        list.map((item) => {
          return (
            <div key={item.title} className={styles.item_wrap}>
              <ItemPlan plan={item} />
            </div>
          )
        })
      ) : (
        <span className={styles.text}>--список пуст--</span>
      )}
    </div>
  )
}

export default ListPurchased
