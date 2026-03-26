import { useState } from 'react'
import { Spinner } from '@vkontakte/vkui'

import styles from './ResultSort.module.css'
import PreviewPlan from '../preview-plan/PreviewPlan'

const ResultSort = ({ sortList }) => {
  const [isLoad, setIsLoad] = useState(true)

  setTimeout(() => {
    setIsLoad(false)
  }, [300])

  if (isLoad) {
    return <Spinner />
  }

  return (
    <div className={styles.result_sort}>
      {sortList.length === 0 ? (
        <span className={styles.message}>
          Планов по заданным параметрам пока нет. Возможно, вас
          заинтересуют другие дистанции.
        </span>
      ) : (
        sortList.map((elem) => {
          return (
            <div key={elem._id}>
              <PreviewPlan objPlan={elem} />
            </div>
          )
        })
      )}
    </div>
  )
}

export default ResultSort
