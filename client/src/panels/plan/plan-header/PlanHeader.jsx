import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { MdOutlineRunCircle } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { LuChartLine } from 'react-icons/lu'

import styles from './PlanHeader.module.css'
import ShowPace from './show-pace/ShowPace'
import PlanStatistics from './plan-statistics/PlanStatistics'
import AboutPlan from './about-plan/AboutPlan'
import PlanStartDate from './plan-start-date/PlanStartDate.jsx'
import MyModal from '../../../UI/modal/Modal.jsx'

const PlanHeader = ({ plan }) => {
  const userTier =
    useSelector((state) => state.user.tier) || 'amateur'
  const [showBlockAbout, setShowBlockAbout] = useState(false)
  const [showBlockStartDate, setShowBlockStartDate] = useState(false)
  const [showBlockCalcPace, setShowBlockCalcPace] = useState(false)
  const [showBlockStatistics, setShowBlockStatistics] =
    useState(false)
  const [showMyModal, setShowMyModal] = useState(false)

  return (
    <>
      {showBlockAbout && (
        <AboutPlan
          title={plan.title}
          description={plan.subtitle}
          distance={plan.distance}
          period={plan.period}
          show={(val) => setShowBlockAbout(val)}
        />
      )}
      {showBlockStartDate && (
        <PlanStartDate
          planId={plan._id}
          startDate={plan.startDate}
          show={(val) => setShowBlockStartDate(val)}
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
          {(Object.keys(plan.workouts).length !== 0 && plan.title) ||
            ''}
        </span>
        <div className={styles.plan_header_icons}>
          <IoMdInformationCircleOutline
            className={styles.plan_icon}
            size={22}
            title="детали плана"
            onClick={() => setShowBlockAbout(true)}
          />
          <IoCalendarNumberOutline
            className={styles.plan_icon}
            size={22}
            title="установить даты плана"
            onClick={() => setShowBlockStartDate(true)}
          />
          {userTier === 'amateur' ? (
            <LuChartLine
              className={styles.plan_icon_disabled}
              size={22}
              title="статистика"
              onClick={() => setShowMyModal(true)}
            />
          ) : (
            <LuChartLine
              className={styles.plan_icon}
              size={22}
              title="статистика"
              onClick={() => setShowBlockStatistics(true)}
            />
          )}

          <MdOutlineRunCircle
            className={styles.plan_icon}
            size={22}
            title="тренировачный темп"
            onClick={() => setShowBlockCalcPace(true)}
          />
        </div>
      </div>
      <MyModal
        active={showMyModal}
        setActive={(val) => setShowMyModal(val)}
      >
        Статистика не доступна для уровня Физкультурник
      </MyModal>
    </>
  )
}

export default PlanHeader
