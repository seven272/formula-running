import React from 'react'

import styles from './MenuPlans.module.css'
import TypePlan from './TypePlan'

const MenuPlans = ({ arrPlans, clearSort }) => {
  return (
    <div className={styles.plans__menu}>
      <div className={styles.plans__wrapper}>
        <TypePlan arrPlans={arrPlans} clearSort={clearSort} />
      </div>
    </div>
  )
}

export default MenuPlans
