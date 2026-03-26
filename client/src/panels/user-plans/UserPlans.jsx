import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '@vkontakte/vkui'

import styles from './UserPlans.module.css'
import ListCustom from './list-custom/ListCustom'
import ListPurchased from './list-purchased/ListPurchased'
import CurrentPlan from './current-plan/CurrentPlan'
import { fetchGetPurchasedPlans } from '../../redux/slices/plansSlice'
import { fetchGetCustomPlans } from '../../redux/slices/customPlanSlice'
import { fetchGetCurrentPlan } from '../../redux/slices/currentPlanSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const UserPlans = ({ id }) => {
  const dispatch = useDispatch()
  const customPlans = useSelector(
    (state) => state.customPlan.listCustomPlans,
  )
  const purchasedPlans = useSelector(
    (state) => state.plans.purchasedPlans,
  )

  useEffect(() => {
    dispatch(fetchGetCustomPlans())
    dispatch(fetchGetPurchasedPlans())
    dispatch(fetchGetCurrentPlan())
  }, [dispatch])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.main}>
        <CurrentPlan />
        <ListPurchased list={purchasedPlans} />
        <ListCustom list={customPlans} />
      </div>
      <Footer />
    </Panel>
  )
}

export default UserPlans
