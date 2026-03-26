import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { MdOutlineRunCircle } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { TfiCup } from 'react-icons/tfi'
import { Panel } from '@vkontakte/vkui'

import WeekPlan from './weekPlan/WeekPlan.jsx'
import styles from './Plan.module.css'
import Pagination from '../../components/pagination/Pagination.jsx'
import PlanFooter from './plan-footer/PlanFooter.jsx'
import AboutPlan from './about-plan/AboutPlan.jsx'
import { fetchGetCurrentPlan } from '../../redux/slices/currentPlanSlice.js'
import Loader from '../../UI/loader/Loader.jsx'
import ShowPace from './show-pace/ShowPace.jsx'
import Progressbar from '../../UI/progressbar/Progressbar.jsx'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Plan = ({ id }) => {
  const dispatch = useDispatch()
  const objPlan = useSelector((state) => state.currentPlan.plan)
  const percent = useSelector(
    (state) => state.currentPlan.progress.percent,
  )
  const [plan, setPlan] = useState({})
  const [showBlockAbout, setShowBlockAbout] = useState(false)
  const [showBlockCalcPace, setShowBlockCalcPace] = useState(false)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const paginate = (pageNumber) => {
    setTimeout(() => {
      setPage(pageNumber - 1)
    }, 200)
  }

  const handleShare = () => {
    console.log('share result')
  }

  useEffect(() => {
    dispatch(fetchGetCurrentPlan())
  }, [])

  useEffect(() => {
    if (Object.keys(objPlan).length !== 0) {
      const arr = objPlan.workouts
      setPlan(arr)
    }
  }, [objPlan])

  if (Object.keys(plan).length === 0) {
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
              title={objPlan.title}
              description={objPlan.subtitle}
              distance={objPlan.distance}
              period={objPlan.period}
              show={(val) => setShowBlockAbout(val)}
            />
          )}
          {showBlockCalcPace && (
            <ShowPace
              show={setShowBlockCalcPace}
              paces={objPlan.pace}
            />
          )}
          <div className={styles.plan_header}>
            <span className={styles.plan_title}>
              {Object.keys(plan).length !== 0 && objPlan.title}
            </span>
            <IoMdInformationCircleOutline
              className={styles.plan__icon}
              size={17}
              title="детали плана"
              onClick={() => setShowBlockAbout(true)}
            />
            <MdOutlineRunCircle
              className={styles.plan__icon}
              size={17}
              title="тренировачный темп"
              onClick={() => setShowBlockCalcPace(true)}
            />
          </div>
          {Object.keys(plan).length !== 0 &&
            plan.map((week, inx) => {
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
            totalElements={plan.length}
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
            <Progressbar completed={percent} />
          )}

          <PlanFooter />
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default Plan
