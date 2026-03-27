import { Spinner } from '@vkontakte/vkui'

import styles from './ListPurchasedPlans.module.css'

const ListPurchasedPlans = ({ plans }) => {
  if (!plans) {
    return <Spinner />
  }
  return (
    <div className={styles.main}>
      <h3 className={styles.title}>
        Список купленных готовых планов
      </h3>
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
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListPurchasedPlans
