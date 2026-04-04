import React from 'react'

import PaceZones from '../../../components/pace-zones/PaceZones'
import styles from './Paces.module.css'

const Paces = () => {
  return (
    <div className={styles.paces}>
        <span className={styles.title}>Темповые зоны</span>
        <PaceZones />
    </div>
  )
} 

export default Paces