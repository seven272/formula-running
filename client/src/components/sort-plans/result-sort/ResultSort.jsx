import React from 'react'

import styles from './ResultSort.module.css'
import PreviewPlan from '../../shopPlans/menuPlans/previewPlan/PreviewPlan'

const ResultSort = ({ sortList }) => {
  return (
    <div className={styles.result_sort}>
      {sortList.map((elem) => { 
        return (
          <div key={elem._id}>
            <PreviewPlan objPlan={elem} />
          </div>
        )
      })}
    </div>
  )
}

export default ResultSort
