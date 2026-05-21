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
    // Если дата старта не назначена, или это НЕ первая неделя — рендерим всё в стандартном режиме
    if (!startDate || weekNumber !== 0) {
      return week.sessions.map((day, inx) => (
        <div key={inx} className={styles.week}>
          <DayPlan
            {...day}
            numberDayInWeek={inx + 1}
            weekId={week._id}
            weekNumber={weekNumber}
            startDate={startDate}
          />
        </div>
      ))
    }

    // ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ ПЕРВОЙ НЕДЕЛИ
    const start = new Date(startDate)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    const elements = []

    // 1. Генерируем пустые дни ожидания ДО дня старта плана (их нет в БД, это просто заглушки в UI)
    for (let i = 1; i < startDayOfWeek; i++) {
      elements.push(
        <div key={`empty-${i}`} className={styles.week}>
          <DayPlan
            numberDayInWeek={i}
            weekNumber={weekNumber}
            startDate={startDate}
            isEmptyBeforeStart={true}
            completed={false}
            title="Отдых"
            descr="Ожидание старта плана"
            day="--"
            _id={`empty-id-${i}`}
            weekId={week._id}
          />
        </div>,
      )
    }

    // 2. Выводим ВСЕ реальные тренировки из базы данных без каких-либо исключений и обрезок
    week.sessions.forEach((day, inx) => {
      // Порядковый номер планомерно растет дальше, обеспечивая правильный расчет даты в календаре
      const currentDayNumber = startDayOfWeek + inx

      elements.push(
        <div key={`real-${inx}`} className={styles.week}>
          <DayPlan
            {...day}
            numberDayInWeek={currentDayNumber} // Даты рассчитаются идеально
            weekId={week._id}
            weekNumber={weekNumber}
            startDate={startDate}
          />
        </div>,
      )
    })

    return elements
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
