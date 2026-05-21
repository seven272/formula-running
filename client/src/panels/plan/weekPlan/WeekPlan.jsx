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
    // Если дата старта не назначена, или это НЕ первая неделя (не 0) — рендерим как раньше
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

    // ЛОГИКА ДЛЯ ПЕРВОЙ НЕДЕЛИ С ДАТОЙ СТАРТА
    const start = new Date(startDate)
    // Получаем день недели старта: 1 - Пн, 2 - Вт ... 7 - Вс
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    const elements = []

    // 1. Генерируем пустые дни ожидания ДО дня старта плана
    for (let i = 1; i < startDayOfWeek; i++) {
      elements.push(
        <div key={`empty-${i}`} className={styles.week}>
          <DayPlan
            numberDayInWeek={i}
            weekNumber={weekNumber}
            startDate={startDate}
            isEmptyBeforeStart={true} // Флаг для пустых дней
            // Защитные дефолтные пропсы:
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

    // 2. Выводим реальные тренировки плана, начиная со дня старта
    week.sessions.forEach((day, inx) => {
      // Порядковый номер дня в неделе теперь рассчитывается динамически
      const currentDayNumber = startDayOfWeek + inx

      // Защита: в неделе всего 7 дней. Если тренировок автора больше, чем осталось дней в неделе,
      // они не должны сломать сетку (перенесутся по датам дальше)
      if (currentDayNumber <= 7) {
        elements.push(
          <div key={`real-${inx}`} className={styles.week}>
            <DayPlan
              {...day}
              numberDayInWeek={currentDayNumber}
              weekId={week._id}
              weekNumber={weekNumber}
              startDate={startDate}
            />
          </div>,
        )
      }
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
