import { useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Spinner } from '@vkontakte/vkui'

import styles from './FinalResult.module.css'
import SummaryPlan from '../../../components/summary-plan/SummaryPlan'
import PacePlan from '../../../components/pace-plan/PacePlan'
import RunningPlanChart from '../../../components/running-plan-chart/RunningPlanChart'

const FinalResult = ({ goBack }) => {
  const { customPace, title, status, customWorkouts } = useSelector(
    (state) => state.customPlan,
  )


  const multipliers = {
    stage: {
      build: 'строительства',
      base: 'базовый',
      peak: 'пиковый',
      taper: 'разгрузочный',
    },
    colors: {
      build: '#b1e4fc',
      base: '#a7bcec',
      peak: '#fd9a9a',
      taper: '#7bf8af',
    },
  }

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'failed') {
    return (
      <div className={styles.error}>
        <span className={styles.error_text}>
          Не получилось создать план, произошла ошибка.
        </span>
      </div>
    )
  }

  return (
    <div className={styles.main_sample_plan}>
      <div className={styles.back} onClick={() => goBack(false)}>
        <IoClose className={styles.back_icon} size={20} />
        <span className={styles.back_text}>закрыть</span>
      </div>

      <SummaryPlan />
      <RunningPlanChart planWeeks={customWorkouts} />
      <PacePlan paces={customPace} />

      <div className={styles.plan}>
        <span className={styles.plan_title}>{title}</span>
        {customWorkouts.map((w, inx) => {
          return (
            <div className={styles.week} key={inx}>
              <div
                className={styles.week_header}
                style={{
                  backgroundColor: multipliers.colors[w.stage],
                }}
              >
                <h3>Неделя {w.weekNumber}</h3>
                <div className={styles.week_header_wrap}>
                  <span>период: {multipliers.stage[w.stage]}</span>
                  <span>беговой объем: {w.weeklyKm} км</span>
                </div>
              </div>
              {w.sessions.map((d, inx) => {
                return (
                  <div
                    key={inx}
                    className={`${styles.day} ${inx % 2 ? styles.background_light : styles.background_dark}`}
                  >
                    <span className={styles.day_name}>{d.day}</span>
                    <span className={styles.day_title}>
                      <p>{d.title}</p>
                    </span>
                    <span className={styles.day_descr}>
                      <p>{d.descr}</p>
                      {d.isStrength && (
                        <span>
                          {d.strength.title}{' '}
                          <RouterLink
                            className={styles.href}
                            to="/info/strength-training"
                          >
                            {d.strength.descr}
                          </RouterLink>
                        </span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <h3 className={styles.plan_ps}>
        <FaRegFilePdf size={15} />план в формате pdf доступен в разделе Мои
        планы
      </h3>
    </div>
  )
}

export default FinalResult
