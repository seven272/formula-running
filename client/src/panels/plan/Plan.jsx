import { useEffect, useState } from 'react'
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

  // Добавляем новый useEffect, который сработает, когда план загрузится в Redux
  useEffect(() => {
    // Проверяем, что план загружен, в нем есть тренировки и установлена дата старта
    if (
      plan &&
      plan.workouts &&
      plan.workouts.length > 0 &&
      plan.startDate
    ) {
      const now = new Date()
      const start = new Date(plan.startDate)

      // Находим понедельник недели старта, чтобы расчет был точным
      const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()
      const firstMonday = new Date(start)
      firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

      // Сбрасываем время у дат для чистого сравнения дней
      now.setHours(0, 0, 0, 0)
      firstMonday.setHours(0, 0, 0, 0)

      // Разница в миллисекундах переводим в дни
      const diffTime = now.getTime() - firstMonday.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      // Считаем индекс текущей недели (целое деление на 7)
      const currentWeekIndex = Math.floor(diffDays / 7)

      // Если план уже идет, проверяем, чтобы индекс не выходил за рамки массива тренировок
      if (
        currentWeekIndex >= 0 &&
        currentWeekIndex < plan.workouts.length
      ) {
        setPage(currentWeekIndex)
      } else if (currentWeekIndex >= plan.workouts.length) {
        // Если все недели прошли, открываем последнюю неделю плана
        setPage(plan.workouts.length - 1)
      }
    }
  }, [plan]) // Сработает каждый раз, когда plan обновляется (при загрузке, смене или сбросе даты)

  if (Object.keys(plan.workouts).length === 0) {
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
              Активный план не выбран. Сделайте это перейдя на
              страницу Мой планы. Предварительно добавив понравившиеся
              планы в избранное или купив их.
            </span>
            <RouterLink to="/userplans">
              ПЕРЕЙТИ В МОИ ПЛАНЫ
            </RouterLink>
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

          {Object.keys(plan.workouts).length !== 0 &&
            plan.workouts.map((week, inx) => {
              return (
                <WeekPlan
                  key={inx}
                  week={week}
                  weekNumber={inx}
                  startDate={plan.startDate}
                  paginatePage={page}
                />
              )
            })}

          <Pagination
            paginate={paginate}
            elementsPerPage={1}
            totalElements={plan.workouts.length}
            activePage={page}
          />
          {percent === 100 ? (
            <div className={styles.compliment}>
              <span className={styles.compliment_text}>
                Поздравляем! Вы завершили план тренировок и готовы к
                старту. Самое время поделиться этим достижением.
              </span>
              <div className={styles.btn_wrap} onClick={handleShare}>
                <TfiCup size={40} className={styles.cup_icon} />
                <span className={styles.compliment_text_btn}>
                  в историю
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.progress_wrap}>
              <div className={styles.progress_container}>
                <Progressbar completed={percent} />
              </div>
              <button
                className={styles.btn_reset_progress}
                onClick={showModal}
              >
                <BiReset size={25} />
              </button>
            </div>
          )}

          <PlanFooter />
        </div>
        <Modal
          title="Сброс прогресса"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          okText="Обнулить"
          cancelText="Вернуться назад"
          onOk={handleOkReset}
          onCancel={handleCancelReset}
        >
          <span>
            Вы уверены, что хотите обнулить прогресс по всем
            тренировкам в этом плане?
          </span>
        </Modal>
      </div>
      <Footer />
    </Panel>
  )
}

export default Plan
