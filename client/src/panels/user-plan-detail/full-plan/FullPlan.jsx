import React from 'react'
import { RouterLink } from '@vkontakte/vk-mini-apps-router'

import SummaryPlan from '../../../components/summary-plan/SummaryPlan'
import PacePlan from '../../../components/pace-plan/PacePlan'
import RunningPlanChart from '../../../components/running-plan-chart/RunningPlanChart'
import styles from './FullPlan.module.css'

const FullPlan = ({ plan, typePlan }) => {
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
  return (
    <div className={styles.main_fullplan}>
      <SummaryPlan />
      {typePlan === 'generate' && (
        <RunningPlanChart planWeeks={plan.workouts} />
      )}
      <PacePlan paces={plan.pace} />

      <div className={styles.plan}>
        <span className={styles.plan_title}>{plan.title}</span>
        {plan.workouts.map((w, inx) => {
          return (
            <div className={styles.week} key={inx}>
              <div
                className={styles.week_header}
                style={{
                  backgroundColor: typePlan === 'generate' ? multipliers.colors[w.stage] : '#dde8fc',
                }}
              >
                <h3>Неделя {w.weekNumber}</h3>
                {typePlan === 'generate' && (
                  <div className={styles.week_header_wrap}>
                    <span>период: {multipliers.stage[w.stage]}</span>
                    <span>беговой объем: {w.weeklyKm} км</span>
                  </div>
                )}
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
                      {d?.isStrength && (
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
    </div>
  )
}

export default FullPlan
