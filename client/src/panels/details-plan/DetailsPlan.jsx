import { useState, useEffect } from 'react'
import {
  useParams,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { MdOutlineStarBorder } from 'react-icons/md'
import { TbLock } from 'react-icons/tb'
import { Panel } from '@vkontakte/vkui'
import { ScreenSpinner } from '@vkontakte/vkui'

import styles from './DetailsPlan.module.css'
import {
  fetchBuyPlan,
  fetchGetAllPlans,
} from '../../redux/slices/plansSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const DetailsPlan = ({ id }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()
  const currentId = params.id
  const routerNavigate = useRouteNavigator()
  const { allPlans, purchasedPlans, isLoading } = useSelector(
    (state) => state.plans,
  )
  const { readyPlansLimit } = useSelector((state) => state.user)
  const vkToken = useSelector((state) => state.auth.vkToken)
  const [isPurchased, setIsPurchased] = useState(false)
  const hasLimit = vkToken
    ? (purchasedPlans?.length || 0) < (readyPlansLimit || 0)
    : true

  // Находим план сразу в теле компонента (memoization)
  const plan = allPlans.find((elem) => elem._id === currentId)

  // Безопасно вычисляем тренировки
  const training = plan?.workouts
    ? (typeof plan.workouts === 'string'
        ? JSON.parse(plan.workouts)
        : plan.workouts)[0]?.sessions
    : []

  useEffect(() => {
    // Грузим планы только если их еще нет в сторе
    if (allPlans.length === 0) {
      dispatch(fetchGetAllPlans())
    }
  }, [dispatch, allPlans?.length])

  const buyPlan = () => {
    dispatch(fetchBuyPlan(currentId))
    setIsPurchased((prev) => !prev)
  }

  const checkPurchased = () => {
    const arrId = purchasedPlans.map((elem) => {
      return elem.originalPlanId
    })
    const value = arrId.includes(currentId)

    setIsPurchased(value)
  }

  useEffect(() => {
    checkPurchased()
  }, [allPlans, currentId])

  // Обработка отсутствия плана
  if (!plan) {
    if (isLoading)
      return (
        <Panel id={id}>
          <ScreenSpinner />
        </Panel>
      )

    // Если загрузка прошла, а плана нет — значит ID неверный, редиректим
    return (
      <Panel id={id}>
        <div className={styles.error}>
          План не найден или был удален
        </div>
        <button onClick={() => routeNavigator.back()}>Назад</button>
      </Panel>
    )
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
                  training?.length > 0 &&
                  training.map((elem, inx) => {
                    return (
                      <li key={elem.id} className={styles.plan__day}>
                        <span className={styles.plan__day_number}>
                          {inx + 1}
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

          <div className={styles.btn_wrap}>
            {isPurchased ? (
              <button className={styles.card_btn} disabled>
                Уже у вас{' '}
                <MdOutlineStarBorder
                  size={15}
                  className={styles.btn_icon}
                />
              </button>
            ) : hasLimit ? (
              <button className={styles.card_btn} onClick={buyPlan}>
                Заниматься{' '}
                <MdOutlineStarBorder
                  size={15}
                  className={styles.btn_icon}
                />
              </button>
            ) : (
              <button
                className={styles.card_btn}
                onClick={() => routeNavigator.push('/status')}
              >
                Улучшить статус{' '}
                <TbLock size={15} className={styles.btn_icon} />
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
