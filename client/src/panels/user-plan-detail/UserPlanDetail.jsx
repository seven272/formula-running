import { Panel, PanelSpinner } from '@vkontakte/vkui'
import {
  useParams,
  useSearchParams,
} from '@vkontakte/vk-mini-apps-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './UserPlanDetail.module.css'
import BriefPlan from './brief-plan/BriefPlan'
import FullPlan from './full-plan/FullPlan'
import NotFound from '../../components/not-found/NotFound'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const UserPlanDetail = ({ id }) => {
  const { url } = useParams()
  const [params] = useSearchParams()
  const typePlan = params.get('type')

  const listCustomPlans = useSelector(
    (state) => state.customPlan.listCustomPlans,
  )
  const listPurchasedPlans = useSelector(
    (state) => state.plans.purchasedPlans,
  )

  console.log(listPurchasedPlans)
  const [plan, setPlan] = useState(null)
  const [isSearching, setIsSearching] = useState(true)

  useEffect(() => {
    setIsSearching(true)
    let item = null
    if (typePlan === 'generate') {
      item = listCustomPlans.find((elem) => elem.planUrl === url)
    } else if (typePlan === 'paid') {
      item = listPurchasedPlans.find((elem) => elem.planUrl === url)
    }

    setPlan(item)
    setIsSearching(false) // Поиск завершен (неважно, нашли или нет)
  }, [url, listCustomPlans, listPurchasedPlans, typePlan])

  if (isSearching) {
    return (
      <Panel id={id}>
        <Header />
        <PanelSpinner />
        <Footer />
      </Panel>
    )
  }

  if (!plan) {
    return (
      <Panel id={id}>
        <Header />
        <NotFound />
        <Footer />
      </Panel>
    )
  }

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.main_detail_plan}>
        <BriefPlan plan={plan} typePlan={typePlan} />
        <FullPlan plan={plan} typePlan={typePlan} />
      </div>
      <Footer />
    </Panel>
  )
}

export default UserPlanDetail
