import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose } from 'react-icons/md'

import styles from './ListPlans.module.css'
import { fetchGetAllPlans } from '../../../redux/slices/plansSlice'
import SinglePlan from './single-plan/SinglePlan'

const ListPlans = ({closeFn}) => {
  const dispatch = useDispatch()
  const listPlans = useSelector((state) => state.plans.allPlans)
  useEffect(() => {
    dispatch(fetchGetAllPlans())
  }, [])
  return (
    <div className={styles.section}>
      <span className={styles.title}>
              Список созданных планов <MdClose size={20} onClick={() => closeFn('')} />
            </span>
      <ul className={styles.items}>
        {listPlans &&
          listPlans.map((plan) => {
            return (
              <li className={styles.item} key={plan._id}>
                <SinglePlan plan={plan} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default ListPlans
