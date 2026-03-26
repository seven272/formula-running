import React from 'react'

import DayPlan from './dayPlan/DayPlan'
import styles from './WeekPlan.module.css'

const WeekPlan = ({ week, paginatePage = 0, weekNumber }) => {
  return (
    <>
      {weekNumber === paginatePage && (
        <div className={styles.week}>
          <span className={styles.week__title}>
            Неделя {week.weekNumber}
          </span>

          {week.sessions.map((day, inx) => {
            return (
              <div key={inx} className={styles.week}>
                <DayPlan {...day} numberDayInWeek={inx + 1} weekId = {week._id} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default WeekPlan
