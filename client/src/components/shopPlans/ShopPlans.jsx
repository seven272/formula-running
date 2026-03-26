import React, { useState } from 'react'


import MenuPlans from './menuPlans/MenuPlans.jsx'
import styles from './ShopPlans.module.css'
import schemaSearch from '../../assets/data/schemaSearch.js'

 
const ShopPlans = ({clearSort}) => {
  const [arrPlans] = useState(schemaSearch) 

  return (
    <div className={styles.shop}>
      <MenuPlans arrPlans={arrPlans} clearSort={clearSort}/>
    </div>
  )  
}

export default ShopPlans
