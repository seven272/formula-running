import React from 'react'
import DayPlan from './dayPlan/DayPlan'
import styles from './WeekPlan.module.css'

const WeekPlan = ({
  week,
  paginatePage = 0,
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
      // Для каждого элемента (неважно, заглушка это или реальный день)
      // дата рассчитывается абсолютно линейно: Понедельник + СмещениеНедели + НомерДня
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
            calculatedDate={currentDayDate} // Передаем точную железную дату
          />
        </div>
      )
    })
  }

  return (
    <>
      {weekNumber === paginatePage && (
        <div className={styles.week}>
          <span className={styles.week__title}>
            Неделя {week.weekNumber}
          </span>
          {renderSessions()}
        </div>
      )}
    </>
  )
}

export default WeekPlan
