import { useEffect, useState } from 'react'

import { MdOutlineMoneyOffCsred, MdReceiptLong } from 'react-icons/md'
import { MdAttachMoney } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'

import styles from './SortPlans.module.css'

import {
  fetchGetAllPlans,
  fetchGetFreePlans,
  fetchGetPaidPlans,
  cancelClearSort
} from '../../redux/slices/plansSlice'
import ResultSort from './result-sort/ResultSort'

const SortPlans = () => {
  const dispatch = useDispatch()
  const { paidPlans, freePlans, allPlans, isClear } = useSelector(
    (state) => state.plans
  )
  const [sortValue, setSortValue] = useState('')
  const [arrPlans, setArrPlans] = useState([])


  const getAllPlans = (value) => {
    dispatch(cancelClearSort())
    setSortValue(value)
    dispatch(fetchGetAllPlans())
    
  }

  const getFreePlans = (value) => {
    dispatch(cancelClearSort())
    setSortValue(value)
    dispatch(fetchGetFreePlans())
  } 

  const getPaidPlans = (value) => {
    dispatch(cancelClearSort())
    setSortValue(value)
    dispatch(fetchGetPaidPlans())
  }

  useEffect(() => {
    if (sortValue === 'all') {
      setArrPlans(allPlans)
    } else if (sortValue === 'free') {
      setArrPlans(freePlans)
    } else if (sortValue === 'paid') {
      setArrPlans(paidPlans)
    } else if (sortValue === '') {
      setArrPlans([])
    }
  }, [sortValue, allPlans, freePlans, paidPlans])

  useEffect(() => {
    if(isClear) {
      setSortValue('')
    }
  }, [isClear])

  return (
    <div className={styles.sort_plans}>
      <div className={styles.menu_sort}>
        <span className={styles.title}>показать планы:</span>
        <ul className={styles.items}>
          <li
            className={
              sortValue === 'all' ? styles.item_active : styles.item
            }
            onClick={() => getAllPlans('all')}
          >
            <MdReceiptLong className={styles.icon} />
            <span className={styles.text}>все</span>
          </li>
          <li
            className={
              sortValue === 'free' ? styles.item_active : styles.item
            }
            onClick={() => getFreePlans('free')}
          >
            <MdOutlineMoneyOffCsred className={styles.icon} />
            <span className={styles.text}>бесплатные</span>
          </li>
          <li
            className={
              sortValue === 'paid'
                ? styles.item_active
                : styles.item
            }
            onClick={() => getPaidPlans('paid')}
          >
            <MdAttachMoney className={styles.icon} />
            <span className={styles.text}>платные</span>
          </li>
        </ul>
      </div>
      <ResultSort sortList={arrPlans} />
    </div>
  )
}

export default SortPlans
