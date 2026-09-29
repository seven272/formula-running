// === Полный обновленный файл WeekPlan.jsx ===
import React from 'react'
import DayPlan from './dayPlan/DayPlan'
import styles from './WeekPlan.module.css'

const WeekPlan = ({
  week,
  weekNumber,
  startDate,
}) => {
  
  const renderSessions = () => {
    const start = new Date(startDate)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // Базовый календарный понедельник всего плана
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    return week.sessions.map((daySession, inx) => {
      const currentDayDate = new Date(firstMonday)
      currentDayDate.setDate(firstMonday.getDate() + (weekNumber * 7) + inx)

      return (
        <div key={`${weekNumber}-day-${inx}`} className={styles.week}>
          <DayPlan
            {...daySession}
            numberDayInWeek={inx + 1} 
            weekId={week._id}
            weekNumber={weekNumber}
            startDate={startDate}
            calculatedDate={currentDayDate}
          />
        </div>
      )
    })
  }

  return (
    <div className={styles.week}>
      {/* 🚀 Изменено: Условие weekNumber === paginatePage убрано, рендер идет напрямую */}
      <span className={styles.week__title}>
        Неделя {week.weekNumber}
      </span>
      {renderSessions()}
    </div>
  )
}

export default WeekPlan
