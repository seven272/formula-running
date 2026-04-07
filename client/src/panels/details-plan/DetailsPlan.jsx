import { useState, useEffect } from 'react'
import {
  useParams,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { IoCartOutline } from 'react-icons/io5'
import { TbCurrencyDollarOff, TbLock } from 'react-icons/tb'
import { Panel } from '@vkontakte/vkui'
import { ScreenSpinner } from '@vkontakte/vkui'

import styles from './DetailsPlan.module.css'
import { fetchBuyPlan } from '../../redux/slices/plansSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useVkPay } from '../../utils/useVkPay'

const DetailsPlan = ({ id }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const currentId = params.id
  const routerNavigate = useRouteNavigator()
  const { allPlans, purchasedPlans } = useSelector(
    (state) => state.plans,
  )
  const { payVirtualMoney } = useVkPay()
  const [plan, setPlan] = useState({})
  const [training, setTraining] = useState([])
  const [isPurchased, setIsPurchased] = useState(false)

  const findPlan = () => {
    // находим нужный план сравнивая ид элемента и данные их хука useParams
    const currentPlan = allPlans.find(
      (elem) => elem._id === currentId,
    )

    // 1. Добавляем защиту: если план не найден, выходим из функции
    if (!currentPlan) return

    // 2. Безопасно извлекаем workouts
    const rawWorkouts = currentPlan.workouts
    const workouts =
      typeof rawWorkouts === 'string'
        ? JSON.parse(rawWorkouts)
        : rawWorkouts

    setPlan(currentPlan)

    // 3. Защита на случай, если в workouts нет данных или нет нулевого элемента
    if (workouts && workouts[0] && workouts[0].sessions) {
      setTraining(workouts[0].sessions)
    }
    
  }

  const buyPlan = () => {
    payVirtualMoney('ready', currentId)
    setIsPurchased((prev) => !prev)
  }

  const buyFreePlan = () => {
    dispatch(fetchBuyPlan(currentId))
    setIsPurchased((prev) => !prev)
  }

  const canShowPayments = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const platform = urlParams.get('vk_platform')
    // Оплата разрешена ТОЛЬКО на десктопе (desktop_web)
    // и в мобильном браузере (mobile_web)
    const allowedPlatforms = ['desktop_web', 'mobile_web']
    //возвращает true если platform есть в массиве с разрешенными версиями Вконтакте
    return allowedPlatforms.includes(platform)
  }

  const checkPurchased = () => {
    const arrId = purchasedPlans.map((elem) => {
      return elem.originalPlanId
    })
    const value = arrId.includes(currentId)

    setIsPurchased(value)
  }

  useEffect(() => {
    findPlan()
    checkPurchased()
  }, [allPlans, currentId])

  if (!plan || Object.keys(plan).length === 0) {
    return (
      <Panel id={id}>
        <ScreenSpinner />
      </Panel>
    )
    // Или используйте <ScreenSpinner /> от VKUI
  }

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.details}>
        <div className={styles.wrapper}>
          <div
            className={styles.back}
            onClick={() => routerNavigate.back()}
          >
            <BsBoxArrowInLeft
              size={20}
              className={styles.back__icon}
            />
            <span className={styles.back__text}>к списку планов</span>
          </div>
          {plan && (
            <>
              <h2 className={styles.details__title}>{plan.title}</h2>
              <span className={styles.details__period}>
                Срок подготовки, недели: {plan.period}
              </span>
              <span className={styles.details__description}>
                {plan.subtitle}
              </span>
              <h3 className={styles.details__subtitle}>
                Пример первой тренировочной недели
              </h3>
              <div className={styles.plan__header}>
                <span className={styles.plan__header_number}>№</span>
                <span className={styles.plan__header_day}>День</span>
                <span className={styles.plan__header_title}>
                  Тренировка
                </span>
                <span className={styles.plan__header_descr}>
                  Описание
                </span>
              </div>
              <ul className={styles.plan__days}>
                {training &&
                  training.length > 0 &&
                  training.map((elem) => {
                    return (
                      <li key={elem.id} className={styles.plan__day}>
                        <span className={styles.plan__day_number}>
                          {elem.id}
                        </span>
                        <span className={styles.plan__day_day}>
                          {elem.day}
                        </span>
                        <span className={styles.plan__day_title}>
                          {elem.title}
                        </span>
                        <span className={styles.plan__day_descr}>
                          {elem.descr}
                        </span>
                      </li>
                    )
                  })}
                <li></li>
              </ul>
            </>
          )}

          {/* // {canShowPayments() === false && !plan?.isFree && (
          //   <div className={styles.pdf_block}>
          //     <span className={styles.pdf_text}>
          //       * данный план недоступен для приобретения в мобильном
          //       приложении
          //     </span>
          //   </div>
          // )} */}

          <div className={styles.btn_wrap}>
            {plan?.isFree ? (
              <button
                className={styles.card_btn_free}
                disabled={isPurchased}
                onClick={buyFreePlan}
              >
                заниматься бесплатно
                <TbCurrencyDollarOff className={styles.btn_icon} />
              </button>
            ) : canShowPayments() ? (
              <button
                className={styles.card_btn}
                onClick={() => buyPlan()}
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
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default DetailsPlan
