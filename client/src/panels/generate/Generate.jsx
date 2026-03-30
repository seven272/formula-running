import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PiPaperclip } from 'react-icons/pi'
import { Panel } from '@vkontakte/vkui'

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
  fetchCheckToken,
  changeStatusToken,
} from '../../redux/slices/customPlanSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useVkPay } from '../../utils/useVkPay'

const Generate = ({ id }) => {
  const dispatch = useDispatch()
  const { hasToken } = useSelector((state) => state.customPlan)
  const { payVirtualMoney } = useVkPay()

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
          dispatch(changeStatusToken(false))
        })
        .catch((err) => {
          console.error(
            'План не создан, статус токена не изменен',
            err,
          )
        })
    }
  }

  const handlePay = () => {
    payVirtualMoney('custom', '?')
  }

  useEffect(() => {
    dispatch(fetchCheckToken())
  }, [dispatch])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.main_generate}>
        <div className={styles.wrapper}>
          <GenerateHeader />
          <div className={styles.wrap_form}>
            {!hasToken && (
              <div className={styles.overlay}>
                <p>
                  Пожалуйста, оплатите план, чтобы разблокировать
                  форму
                </p>
              </div>
            )}
            <RaceConfig getData={setRaceConfig} />
            <RaceGoal getData={setRaceGoal} />
            <Schedule getData={setSchedule} />
          </div>

          {hasToken ? (
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
          ) : (
            <button className={styles.btn} onClick={handlePay}>
              Оплатить
            </button>
          )}

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
