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
    // Находим день недели старта (1 - пн, ..., 7 - вс)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // Вычисляем реальный календарный понедельник самой первой недели плана
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    // Для текущей недели (страницы) находим её собственный понедельник
    const currentWeekMonday = new Date(firstMonday)
    currentWeekMonday.setDate(firstMonday.getDate() + weekNumber * 7)

    const elements = []

    // Отрисовываем строго 7 дней для текущей недели
    for (let i = 0; i < 7; i++) {
      // Вычисляем точную дату для каждого слота недели (от 0 до 6 дня)
      const currentDayDate = new Date(currentWeekMonday)
      currentDayDate.setDate(currentWeekMonday.getDate() + i)

      // Проверяем, находится ли этот день до официального старта тренировок
      const isEmptyBeforeStart = currentDayDate < start

      // Ищем, есть ли тренировка для этого слота
      // Индекс тренировки в массиве `week.sessions` зависит от того, сколько дней мы "пропустили" на первой неделе
      const sessionIndex = weekNumber * 7 + i - (startDayOfWeek - 1)
      const daySession = week.sessions[sessionIndex]

      // Если дата до старта ИЛИ на эту неделю/день в базе нет тренировки — выводим заглушку отдыха
      if (isEmptyBeforeStart || !daySession) {
        elements.push(
          <div key={`empty-${i}`} className={styles.week}>
            <DayPlan
              numberDayInWeek={i + 1}
              weekNumber={weekNumber}
              startDate={startDate}
              calculatedDate={currentDayDate} // Передаем готовую дату в DayPlan
              isEmptyBeforeStart={isEmptyBeforeStart}
              completed={false}
              title="Отдых"
              descr={
                isEmptyBeforeStart
                  ? 'Ожидание старта плана'
                  : 'Восстановление'
              }
              day="--"
              _id={`empty-id-${weekNumber}-${i}`}
              weekId={week._id}
            />
          </div>,
        )
      } else {
        // Если тренировка есть — рендерим её
        elements.push(
          <div key={`real-${i}`} className={styles.week}>
            <DayPlan
              {...daySession}
              numberDayInWeek={i + 1}
              weekId={week._id}
              weekNumber={weekNumber}
              startDate={startDate}
              calculatedDate={currentDayDate} // Передаем готовую дату в DayPlan
            />
          </div>,
        )
      }
    }

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
