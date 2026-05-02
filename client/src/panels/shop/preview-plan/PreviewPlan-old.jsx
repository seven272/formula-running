import { useState, useEffect } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { BiDetail } from 'react-icons/bi'
import { IoCartOutline } from 'react-icons/io5'
import { TbCurrencyDollarOff, TbLock } from 'react-icons/tb'

import { useDispatch, useSelector } from 'react-redux'

import { fetchBuyPlan } from '../../../redux/slices/plansSlice'
import templatePlanImg from '../../../assets/images/template_plan.png'
// import { useVkPay } from '../../../utils/useVkPay'
import { useVkPayFiat } from '../../../utils/useVkPayFiat'
import styles from './PreviewPlan.module.css'

const URL = import.meta.env.VITE_PUBLIC_URL

const PreviewPlanOld = ({ objPlan }) => {
  const { title, pictureUrl, _id } = objPlan
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()
  const purchasedPlans = useSelector(
    (state) => state.plans.purchasedPlans || [],
  )
  const [isPurchased, setIsPurchased] = useState(false)
  const { payFiatMoney } = useVkPayFiat()

  const canShowPayments = () => { 
    const urlParams = new URLSearchParams(window.location.search)
    const platform = urlParams.get('vk_platform')
    // Оплата разрешена ТОЛЬКО на десктопе (desktop_web)
    // и в мобильном браузере (mobile_web)
    const allowedPlatforms = ['desktop_web', 'mobile_web']
    //возвращает true если platform есть в массиве с разрешенными версиями Вконтакте
    return allowedPlatforms.includes(platform)
  }

  const buyFreePlan = (_id) => {
    dispatch(fetchBuyPlan(_id))
    setIsPurchased((prev) => !prev)
  }

  const buyPlan = (_id) => {
    payFiatMoney('ready', _id, 10)
    setIsPurchased((prev) => !prev)
  }

  const openDetailsPlan = () => {
    routeNavigator.push(`/shop/plan/${_id}`, {
      keepSearchParams: true,
    })
  }

  const checkPurchased = () => {
    const arrId = purchasedPlans.map((elem) => {
      return elem.originalPlanId
    })
    const value = arrId.includes(_id)
    setIsPurchased(value)
  }

  useEffect(() => {
    checkPurchased()
  }, [])

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
          детали
          <BiDetail className={styles.btn_icon} />
        </button>

        {objPlan.isFree ? (
          <button
            className={styles.card_btn_free}
            onClick={() => buyFreePlan(_id)}
            disabled={isPurchased}
          >
            заниматься бесплатно
            <TbCurrencyDollarOff className={styles.btn_icon} />
          </button>
        ) : canShowPayments() ? (
          <button
            className={styles.card_btn}
            onClick={() => buyPlan(_id)}
            disabled={isPurchased}
          >
            купить
            <IoCartOutline className={styles.btn_icon} />
          </button>
        ) : (
          <button disabled={true} className={styles.card_btn}>
            <TbLock className={styles.btn_icon} />
          </button>
        )}
      </div>
      {canShowPayments() === false && (
        <span className={styles.warning}>
          * данный план недоступен для приобретения в мобильном
          приложении
        </span>
      )}
    </div>
  )
}

export default PreviewPlanOld
