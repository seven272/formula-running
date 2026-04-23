import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { MdOutlineRunCircle } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { LuChartLine } from 'react-icons/lu'
import { TfiCup } from 'react-icons/tfi'
import { BiReset } from 'react-icons/bi'
import { Panel } from '@vkontakte/vkui'
import { Modal } from 'antd'

import WeekPlan from './weekPlan/WeekPlan.jsx'
import styles from './Plan.module.css'
import Pagination from '../../components/pagination/Pagination.jsx'
import PlanFooter from './plan-footer/PlanFooter.jsx'
import AboutPlan from './about-plan/AboutPlan.jsx'
import {
  fetchGetCurrentPlan,
  fetchResetProgressPlan,
} from '../../redux/slices/currentPlanSlice.js'
import Loader from '../../UI/loader/Loader.jsx'
import ShowPace from './show-pace/ShowPace.jsx'
import PlanStatistics from './plan-statistics/PlanStatistics.jsx'
import Progressbar from '../../UI/progressbar/Progressbar.jsx'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { shareFinishPlanStory } from '../../utils/vkAppShareStory.js'

const Plan = ({ id }) => {
  const dispatch = useDispatch()
  const plan = useSelector((state) => state.currentPlan.plan)
   const userTier =
    useSelector((state) => state.user.tier) || 'amateur'
  const percent = useSelector(
    (state) => state.currentPlan.progress.percent,
  )
  const [showBlockAbout, setShowBlockAbout] = useState(false)
  const [showBlockCalcPace, setShowBlockCalcPace] = useState(false)
  const [showBlockStatistics, setShowBlockStatistics] =
    useState(false)
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
  }, [])

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
          {showBlockAbout && (
            <AboutPlan
              title={plan.title}
              description={plan.subtitle}
              distance={plan.distance}
              period={plan.period}
              show={(val) => setShowBlockAbout(val)}
            />
          )}
          {showBlockStatistics && (
            <PlanStatistics
              plan={plan}
              onClose={() => setShowBlockStatistics(false)}
            />
          )}
          {showBlockCalcPace && (
            <ShowPace show={setShowBlockCalcPace} paces={plan.pace} />
          )}
          <div className={styles.plan_header}>
            <span className={styles.plan_title}>
              {Object.keys(plan.workouts).length !== 0 && plan.title}
            </span>
            <div className={styles.plan_header_icons}>
              <IoMdInformationCircleOutline
                className={styles.plan_icon}
                size={22}
                title="детали плана"
                onClick={() => setShowBlockAbout(true)}
              />
              {userTier === 'amateur' ? <LuChartLine
                className={styles.plan_icon_disabled}
                size={22}
                title="статистика"
                
              /> : <LuChartLine
                className={styles.plan_icon}
                size={22}
                title="статистика"
                onClick={() => setShowBlockStatistics(true)}
              />}
              
              <MdOutlineRunCircle
                className={styles.plan_icon}
                size={22}
                title="тренировачный темп"
                onClick={() => setShowBlockCalcPace(true)}
              />
            </div>
          </div>
          {Object.keys(plan.workouts).length !== 0 &&
            plan.workouts.map((week, inx) => {
              return (
                <WeekPlan
                  key={inx}
                  week={week}
                  weekNumber={inx}
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
                  в сторис
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
