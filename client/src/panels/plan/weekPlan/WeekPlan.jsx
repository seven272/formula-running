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
    if (!startDate) {
      // Если даты старта нет, рендерим дефолтный список из базы
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

    const start = new Date(startDate)
    // День недели старта: 1 (пн) ... 7 (вс)
    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay()

    // 1. Вычисляем календарный понедельник самой первой недели плана
    const firstMonday = new Date(start)
    firstMonday.setDate(start.getDate() - (startDayOfWeek - 1))

    // 2. Вычисляем понедельник конкретно этой текущей страницы (недели)
    const currentWeekMonday = new Date(firstMonday)
    currentWeekMonday.setDate(firstMonday.getDate() + weekNumber * 7)

    const elements = []

    // Сетка всегда строго 7 дней (от Пн до Вс) на одну страницу пагинации
    for (let i = 0; i < 7; i++) {
      const currentDayDate = new Date(currentWeekMonday)
      currentDayDate.setDate(currentWeekMonday.getDate() + i)
      
      // Сбрасываем время для точного сравнения дней
      currentDayDate.setHours(0, 0, 0, 0)
      const cleanStart = new Date(start)
      cleanStart.setHours(0, 0, 0, 0)

      // Проверяем, не идет ли этот день ДО официального старта плана
      const isEmptyBeforeStart = currentDayDate < cleanStart

      // Магическая формула индекса:
      // Мы берем глобальный номер дня в календаре (weekNumber * 7 + i)
      // И вычитаем количество дней-заглушек (startDayOfWeek - 1)
      // Получаем точный индекс тренировки, которая должна быть в этот календарный день
      const sessionIndex = weekNumber * 7 + i - (startDayOfWeek - 1)

      // Ищем тренировку в «плоском» виде. Так как у нас массив массивов (workouts -> sessions),
      // нам нужно достать нужную тренировку, зная её глобальный порядковый индекс.
      // Но у нас в пропсах есть доступ только к текущей week. 
      // Чтобы не прокидывать весь plan целиком, мы можем рассчитать, к какой неделе в базе относится этот индекс.
      
      if (isEmptyBeforeStart) {
        // Рендерим заглушку ожидания старта
        elements.push(
          <div key={`empty-${i}`} className={styles.week}>
            <DayPlan
              numberDayInWeek={i + 1}
              weekNumber={weekNumber}
              startDate={startDate}
              calculatedDate={currentDayDate} // Передаем рассчитанную дату
              isEmptyBeforeStart={true}
              completed={false}
              title="Отдых"
              descr="Ожидание старта плана"
              day="--"
              _id={`empty-id-${weekNumber}-${i}`}
              weekId={week._id}
            />
          </div>
        )
      } else {
        // Вычисляем, из какой недели в базе (из workouts) нужно взять сессию
        const targetWeekIndex = Math.floor(sessionIndex / 7)
        const targetSessionIndex = sessionIndex % 7

        // Безопасно берем сессию, только если она относится к ТЕКУЩЕЙ рендеримой неделе в UI.
        // Если тренировки уехали на следующую неделю, они отрендерятся на следующей странице пагинации!
        if (targetWeekIndex === weekNumber && week.sessions[targetSessionIndex]) {
          const daySession = week.sessions[targetSessionIndex]
          
          elements.push(
            <div key={`real-${i}`} className={styles.week}>
              <DayPlan
                {...daySession}
                numberDayInWeek={i + 1}
                weekId={week._id}
                weekNumber={weekNumber}
                startDate={startDate}
                calculatedDate={currentDayDate} // Передаем рассчитанную дату
              />
            </div>
          )
        } else {
          // Если план уже закончился, или тренировки для этого дня находятся на другой неделе, 
          // рендерим пустой день отдыха (конец плана или межнедельный баланс)
          elements.push(
            <div key={`rest-${i}`} className={styles.week}>
              <DayPlan
                numberDayInWeek={i + 1}
                weekNumber={weekNumber}
                startDate={startDate}
                calculatedDate={currentDayDate}
                isEmptyBeforeStart={false}
                completed={false}
                title="Отдых"
                descr="День восстановления"
                day="--"
                _id={`rest-id-${weekNumber}-${i}`}
                weekId={week._id}
              />
            </div>
          )
        }
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
