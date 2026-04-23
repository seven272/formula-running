import { useState } from 'react'
import { Spinner } from '@vkontakte/vkui'
import { useSelector } from 'react-redux'

import styles from './ResultSort.module.css'
import PreviewPlan from '../preview-plan/PreviewPlan'

const ResultSort = ({ sortList }) => {
  const purchasedPlans = useSelector(
    (state) => state.plans.purchasedPlans || [],
  )
  const { readyPlansLimit } = useSelector((state) => state.user)
  const [isLoad, setIsLoad] = useState(true)

  setTimeout(() => {
    setIsLoad(false)
  }, [300])

  if (isLoad) {
    return <Spinner />
  }

  return (
    <div className={styles.result_sort}>
      <div className={styles.sticky_counter}>
        <div className={styles.counter_text}>
          Активированных планов:{' '}
          <strong>
            {purchasedPlans.length} из {readyPlansLimit}
          </strong>
        </div>
        <div className={styles.progress_bar}>
          <div
            className={styles.progress_fill}
            style={{
              width: `${(purchasedPlans.length / readyPlansLimit) * 100}%`,
            }}
          ></div>
        </div>
      </div>
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
