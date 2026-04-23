import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PiPaperclip } from 'react-icons/pi'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel } from '@vkontakte/vkui'
// import { TbLock } from 'react-icons/tb'

import styles from './Generate.module.css'
import GenerateHeader from './generate-header/GenerateHeader'
import RaceConfig from './race-config/RaceConfig'
import RaceGoal from './race-goal/RaceGoal'
import Schedule from './schedule/Schedule'
import FinalResult from './final-result/FinalResult'
import SamplePlan from './sample-plan/SamplePlan'
import { showToast } from '../../redux/slices/toastSlice'
import {
  fetchCreateCustomPlan,
  fetchGetCustomPlans,
  fetchCheckToken,
  changeStatusToken,
} from '../../redux/slices/customPlanSlice'
import { fetchUpdateUserTier } from '../../redux/slices/userSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

// import { useVkPay } from '../../utils/useVkPay'
// import { useVkPayFiat } from '../../utils/useVkPayFiat'

const Generate = ({ id }) => {
  const dispatch = useDispatch()
  const routerNavigator = useRouteNavigator()
  const { tier, customPlansLimit } = useSelector(
    (state) => state.user,
  )
  const listCustomPlans = useSelector((state) => state.customPlan.listCustomPlans || []) 
  // const { payFiatMoney } = useVkPayFiat()

  const [dataPlan, setDataPlan] = useState({
    goal: '',
    totalWeeks: null,
    level: '',
    time: null,
    daysPerWeek: null,
    longDay: '',
    isStrength: false,
    strengthDays: [],
    typeSport: 'run',
  })
  const [showSample, setShowSample] = useState(false)
  const [showCreated, setShowCreated] = useState(false)
  console.log(listCustomPlans)
  const hasLimit = listCustomPlans.length < customPlansLimit

  //проверка типа ВК платформы
  // const canShowPayments = () => {
  //   const urlParams = new URLSearchParams(window.location.search)
  //   const platform = urlParams.get('vk_platform')
  //   // Оплата разрешена ТОЛЬКО на десктопе (desktop_web)
  //   // и в мобильном браузере (mobile_web)
  //   const allowedPlatforms = ['desktop_web', 'mobile_web']
  //   //возвращает true если platform есть в массиве с разрешенными версиями Вконтакте
  //   return allowedPlatforms.includes(platform)
  // }

  const setRaceConfig = (payload) => {
    setDataPlan((prev) => {
      return {
        ...prev,
        goal: payload.distance,
        totalWeeks: payload.period,
      }
    })
  }

  const setRaceGoal = (payload) => {
    let updateTime = null
    if (payload.time) {
      const { h, m, s } = payload.time
      updateTime = h * 3600 + m * 60 + s
    }
    setDataPlan((prev) => {
      return { ...prev, level: payload.level, time: updateTime }
    })
  }

  const setSchedule = (payload) => {
    setDataPlan((prev) => {
      return {
        ...prev,
        daysPerWeek: payload.countDays,
        longDay: payload.longDay,
        hasStrengths: payload.isStrength,
        strengthDays: payload.strengthDays,
      }
    })
  }

  const handleCreatePlan = () => {
    const {
      goal,
      totalWeeks,
      level,
      time,
      daysPerWeek,
      longDay,
      hasStrengths,
      strengthDays,
    } = dataPlan

    if (
      !goal ||
      !totalWeeks ||
      !level ||
      !time ||
      !daysPerWeek ||
      !longDay === '' ||
      (hasStrengths && strengthDays.length === 0)
    ) {
      dispatch(
        showToast({
          type: 'error',
          message: 'Необходимо заполнить все обязательные поля',
        }),
      )
    } else {
      setShowCreated(true)
      dispatch(fetchCreateCustomPlan(dataPlan))
        .unwrap()
        .then(() => {
          dispatch(fetchUpdateUserTier())
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: 'error',
              message: err.message || 'Ошибка генерации',
            }),
          )
        })
    }
  }

  // const handlePay = () => {
  //   payFiatMoney('custom', '?', 10)
  // }

  useEffect(() => {
    // dispatch(fetchCheckToken())
    // dispatch(fetchGetCustomPlans())
  }, [dispatch])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.main_generate}>
        <div className={styles.wrapper}>
          <GenerateHeader />
          <div className={styles.wrap_form}>
            {!hasLimit && (
              <div className={styles.overlay}>
                <div className={styles.limit_info}>
                  <span>
                    Лимит исчерпан: {listCustomPlans.length} из{' '}
                    {customPlansLimit}
                  </span>
                  <p>
                    Чтобы создавать больше планов, перейдите на новый
                    уровень
                  </p>
                  <button
                    className={styles.btn_upgrade_overlay}
                    onClick={() => routerNavigator.push('/status')}
                  >
                    Повысить статус
                  </button>
                </div>
              </div>
            )}
            <RaceConfig getData={setRaceConfig} />
            <RaceGoal getData={setRaceGoal} />
            <Schedule getData={setSchedule} />
          </div>
          {/* отрисовываю кнопку взависимости от условий  */}
          <div className={styles.wrap_create}>
            <div className={styles.counter_label}>
              Использовано генераций:{' '}
              <strong>
                {listCustomPlans.length} / {customPlansLimit}
              </strong>
            </div>

            {hasLimit ? (
              <button
                className={styles.btn_create}
                onClick={handleCreatePlan}
              >
                Создать план
              </button>
            ) : (
              <button className={styles.btn_disabled} disabled>
                Лимит исчерпан
              </button>
            )}
          </div>
          {/* {isFreeTry && (
            <div className={styles.wrap_create}>
              <span className={styles.message_create}>
                Ваша первая генерация — бесплатно!
              </span>
              <button
                className={styles.btn_create}
                onClick={handleCreatePlan}
              >
                Бонусная генерация
              </button>
            </div>
          )} */}

          {/* {canShowPayments() === false && !isFreeTry && (
            <div className={styles.wrap_create}>
              <span className={styles.message_create}>
                Платная генерация плана в мобильном приложении
                недоступна
              </span>
              <button className={styles.btn} disabled={true}>
                <TbLock size={20} />
              </button>
            </div>
          )} */}

          {/* {hasToken && !isFreeTry && (
            <div className={styles.wrap_create}>
              <span className={styles.message_create}>
                Создание плана было оплачено. Начинается магия!
              </span>
              <button
                className={styles.btn_create}
                onClick={handleCreatePlan}
              >
                Создать план
              </button>
            </div>
          )} */}

          {/* {!hasToken && !isFreeTry && canShowPayments() && (
            <button className={styles.btn} onClick={handlePay}>
              Оплатить
            </button>
          )} */}

          <div
            className={styles.link}
            onClick={() => setShowSample(true)}
          >
            <PiPaperclip className={styles.icon} />
            посмотреть образец
          </div>
        </div>

        {showCreated && <FinalResult goBack={setShowCreated} />}
        {showSample && <SamplePlan goBack={setShowSample} />}
      </div>
      <Footer />
    </Panel>
  )
}

export default Generate
