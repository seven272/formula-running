import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  RouterLink,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { TfiCup } from 'react-icons/tfi'
import { BiReset } from 'react-icons/bi'
import { Panel } from '@vkontakte/vkui'
import { Modal } from 'antd'
import { BsBoxArrowInLeft } from 'react-icons/bs'

import WeekPlan from './weekPlan/WeekPlan.jsx'
import styles from './Plan.module.css'
import Pagination from '../../components/pagination/Pagination.jsx'
import PlanFooter from './plan-footer/PlanFooter.jsx'
import {
  fetchGetCurrentPlan,
  fetchResetProgressPlan,
} from '../../redux/slices/currentPlanSlice.js'
import Loader from '../../UI/loader/Loader.jsx'
import Progressbar from '../../UI/progressbar/Progressbar.jsx'
import PlanHeader from './plan-header/PlanHeader.jsx'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { shareFinishPlanStory } from '../../utils/vkAppShareStory.js'

const Plan = ({ id }) => {
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()
  const plan = useSelector((state) => state.currentPlan.plan)
  const percent = useSelector(
    (state) => state.currentPlan.progress.percent,
  )
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasCalculatedPage, setHasCalculatedPage] = useState(false)

  const paginate = (pageNumber) => {
    setTimeout(() => {
      setPage(pageNumber - 1)
    }, 200)
  }

  const handleShare = () => {
    shareFinishPlanStory(plan.title)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOkReset = () => {
    setIsModalOpen(false)
    dispatch(fetchResetProgressPlan(plan._id))
  }

  const handleCancelReset = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    dispatch(fetchGetCurrentPlan())
  }, [dispatch])

  useEffect(() => {
    if (hasCalculatedPage) return
    if (
      plan &&
      plan.workouts &&
      plan.workouts.length > 0 &&
      plan.startDate
    ) {
      const now = new Date()
      const start = new Date(plan.startDate)

      const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()
      const firstMonday = new Date(start)
      firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

      now.setHours(0, 0, 0, 0)
      firstMonday.setHours(0, 0, 0, 0)

      const diffTime = now.getTime() - firstMonday.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      const currentWeekIndex = Math.floor(diffDays / 7)

      if (
        currentWeekIndex >= 0 &&
        currentWeekIndex < plan.workouts.length
      ) {
        setPage(currentWeekIndex)
      } else if (currentWeekIndex >= plan.workouts.length) {
        setPage(plan.workouts.length - 1)
      }
      setHasCalculatedPage(true)
    }
  }, [plan, hasCalculatedPage])

  // МАТРИЦА КАЛЕНДАРЯ: Перестраиваем тренировки с учетом сдвига даты старта
  const calendarWorkouts = useMemo(() => {
    if (!plan || !plan.workouts || !plan.startDate) return []

    const start = new Date(plan.startDate)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // 1. Собираем ВСЕ тренировки плана в один плоский массив
    const allSessions = []
    plan.workouts.forEach((week) => {
      if (week.sessions) {
        allSessions.push(...week.sessions)
      }
    })

    // 2. Добавляем пустые заглушки В НАЧАЛО этого плоского списка
    const placeholdersCount = startDayOfWeek - 1
    const totalGrid = []

    for (let i = 0; i < placeholdersCount; i++) {
      totalGrid.push({
        _id: `empty-start-${i}`,
        isEmptyBeforeStart: true,
        title: 'Отдых',
        descr: 'Ожидание старта плана',
        day: '--',
        completed: false,
      })
    }

    // Добавляем реальные тренировки вслед за заглушками
    totalGrid.push(...allSessions)

    // 3. Нарезаем получившийся огромный массив строго по 7 дней на каждую неделю
    const formattedWeeks = []
    const weeksCount = Math.ceil(totalGrid.length / 7)

    for (let w = 0; w < weeksCount; w++) {
      const weekSessions = totalGrid.slice(w * 7, (w + 1) * 7)
      
      // Если на последней неделе не хватает дней до полного размера в 7 дней — добиваем днями отдыха
      while (weekSessions.length < 7) {
        weekSessions.push({
          _id: `empty-end-${weekSessions.length}`,
          isEmptyBeforeStart: false,
          title: 'Отдых',
          descr: 'День восстановления',
          day: '--',
          completed: false,
        })
      }

      // Сохраняем метаданные оригинальной недели (или генерируем новые для UI)
      const originalWeek = plan.workouts[w] || {}
      formattedWeeks.push({
        _id: originalWeek._id || `generated-week-${w}`,
        weekNumber: w + 1,
        sessions: weekSessions,
      })
    }

    return formattedWeeks
  }, [plan])

  if (!plan || !plan.workouts || Object.keys(plan.workouts).length === 0) {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return (
      <div className={styles.error_block}>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <span className={styles.error_text}>
              Активный план не выбран. Сделайте это перейдя на страницу Мой планы.
            </span>
            <RouterLink to="/userplans">ПЕРЕЙТИ В МОИ ПЛАНЫ</RouterLink>
          </div>
        )}
      </div>
    )
  }

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.plan}>
        <div className={styles.plan_wrapper}>
          <button
            className={styles.btn_back}
            onClick={() => routeNavigator.push('/userplans')}
          >
            <BsBoxArrowInLeft className={styles.btn_back_icon} />
            назад
          </button>
          <PlanHeader plan={plan} />
          
          {/* Рендерим отформатированный календарный массив вместо сырого plan.workouts */}
          {calendarWorkouts.map((week, inx) => (
            <WeekPlan
              key={`week-page-${inx}`} // Уникальный ключ для сброса кэша React
              week={week}
              weekNumber={inx}
              startDate={plan.startDate}
              paginatePage={page}
            />
          ))}

          <Pagination
            paginate={paginate}
            elementsPerPage={1}
            totalElements={calendarWorkouts.length}
            activePage={page}
          />
          
          {percent === 100 && (
            <div className={styles.compliment}>
              <div className={styles.compliment_card}>
                <span className={styles.compliment_text}>
                  Поздравляем! Вы успешно завершили весь план тренировок...
                </span>
                <button className={styles.btn_share_story} onClick={handleShare}>
                  <TfiCup size={24} className={styles.cup_icon} />
                  <span className={styles.compliment_text_btn}>
                    Поделиться успехом в Истории
                  </span>
                </button>
              </div>
            </div>
          )}
          <div className={styles.progress_wrap}>
            <div className={styles.progress_container}>
              <Progressbar completed={percent} />
            </div>
            <button className={styles.btn_reset_progress} onClick={showModal}>
              <BiReset size={25} />
            </button>
          </div>

          <PlanFooter />
        </div>
        <Modal
          title="Сброс прогресса"
          open={isModalOpen}
          okText="Обнулить"
          cancelText="Вернуться назад"
          onOk={handleOkReset}
          onCancel={handleCancelReset}
        >
          <span>Вы уверены, что хотите обнулить прогресс?</span>
        </Modal>
      </div>
      <Footer />
    </Panel>
  )
}

export default Plan
