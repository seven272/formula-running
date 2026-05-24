import { Spinner } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'

import styles from './ListGeneratedPlans.module.css'
import { fetchDeleteCustomPlan } from '../../../../redux/slices/customPlanSlice'

const ListGeneratedPlans = ({ plans }) => {
  const dispatch = useDispatch()
  if (!plans) {
    return <Spinner />
  }

  const handleRemovePlan = (planId) => {
    dispatch(fetchDeleteCustomPlan({ planId }))
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Список сгенерированных планов</h3>
      <ul className={styles.items}>
        {plans.map((plan) => {
          return (
            <li className={styles.item} key={plan._id}>
              <span className={styles.text}>
                <strong>id плана:</strong>{' '}
                <span>{plan._id}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>vkid юзера:</strong>{' '}
                <span>{plan.ownerVkId}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>название:</strong>{' '}
                <span>{plan.title}</span>{' '}
              </span>
              <span className={styles.text}>
                <strong>длительность, недели:</strong>{' '}
                <span>{plan.period}</span>{' '}
              </span>
              <button
                className={styles.btn_del}
                onClick={() => handleRemovePlan(plan._id)}
              >
                удалить
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListGeneratedPlans
