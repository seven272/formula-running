
import { useDispatch, useSelector } from 'react-redux'
import { TbNotes } from 'react-icons/tb'

import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './ItemPlan.module.css'
import { fetchChangeCurrentPlan } from '../../../../redux/slices/currentPlanSlice'

const ItemPlan = ({ plan }) => {
  const routerNavigator = useRouteNavigator()
  const dispatch = useDispatch()
  
  const { currentId } = useSelector((state) => state.currentPlan)
  const planId = plan._id
  

  const changeCurrentPlan = () => {
    dispatch(
      fetchChangeCurrentPlan({ planId, modelName: 'PurchasedPlan' }),
    )
  }


  return (
    <div className={styles.item_plan}>
      <span className={styles.title}>{plan.title}</span>
      <div className={styles.btn_wrap}>
        <TbNotes
          size={17}
          className={styles.icon}
          onClick={() => routerNavigator.push(`${plan.planUrl}?type=paid`)}
        />

        {currentId === planId ? (
          <BsCheckCircleFill
            size={15}
            className={styles.icon}
            onClick={changeCurrentPlan}
          />
        ) : (
          <BsCheckCircle
            size={15}
            className={styles.icon}
            onClick={changeCurrentPlan}
          />
        )}
      </div>
    </div>
  )
}

export default ItemPlan
