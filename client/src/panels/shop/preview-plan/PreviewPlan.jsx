import { useState, useEffect } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { BiDetail } from 'react-icons/bi'
import { MdOutlineStarBorder } from "react-icons/md";
import { TbLock } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBuyPlan } from '../../../redux/slices/plansSlice'
import templatePlanImg from '../../../assets/images/template_plan.png'
import styles from './PreviewPlan.module.css'

const URL = import.meta.env.VITE_PUBLIC_URL

const PreviewPlan = ({ objPlan }) => {
  const { title, pictureUrl, _id } = objPlan
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()
  const purchasedPlans = useSelector(
    (state) => state.plans.purchasedPlans || [],
  )
  const { readyPlansLimit } = useSelector((state) => state.user)
  const [isPurchased, setIsPurchased] = useState(false)
  const hasLimit = purchasedPlans.length < readyPlansLimit

  const buyPlan = (_id) => {
    dispatch(fetchBuyPlan(_id))
    setIsPurchased((prev) => !prev)
  }

  const openDetailsPlan = () => {
    routeNavigator.push(`/shop/plan/${_id}`, {
      keepSearchParams: true,
    })
  }

  useEffect(() => {
    const arrId = purchasedPlans.map((elem) => elem.originalPlanId)
    setIsPurchased(arrId.includes(_id))
  }, [purchasedPlans, _id])

  return (
    <div className={styles.card}>
      <span className={styles.title}>{title || ''}</span>
      {pictureUrl !== '' ? (
        <img
          className={styles.picture}
          src={`${URL}/${pictureUrl}` || ''}
          alt={title}
        />
      ) : (
        <img
          src={templatePlanImg}
          alt="шаблон изображение плана"
          className={styles.template_img}
        />
      )}

      <div className={styles.card__btn_wrap}>
        <button className={styles.card_btn} onClick={openDetailsPlan}>
          Детали
          <BiDetail className={styles.btn_icon} />
        </button>

        {isPurchased ? (
          <button className={styles.card_btn} disabled>
            Уже у вас <MdOutlineStarBorder className={styles.btn_icon}/>
          </button>
        ) : hasLimit ? (
          <button
            className={styles.card_btn}
            onClick={() => buyPlan(_id)}
          >
            Заниматься <MdOutlineStarBorder className={styles.btn_icon}/>
          </button>
        ) : (
          <button
            className={styles.card_btn}
            onClick={() => routeNavigator.push('/status')}
          >
            Улучшить статус <TbLock className={styles.btn_icon}/>
          </button>
        )}
      </div>

      <span className={styles.warning}>
      </span>
    </div>
  )
}

export default PreviewPlan
