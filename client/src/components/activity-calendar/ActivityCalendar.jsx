import { Tooltip } from 'react-tooltip' // Импорт
import 'react-tooltip/dist/react-tooltip.css' // Обя
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import './styles.css' // Для кастомных цветов

const ActivityCalendar = ({ activityDates = [] }) => {
  // activityDates — это массив ['2023-10-01', '2023-10-03'] из Virtual
  const russianMonths = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ]
  const russianDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 90)

  //   if (activityDates.length === 0) {
  //     return (
  //       <p style={{ color: '#888' }}>
  //         Выполните первую тренировку, чтобы увидеть прогресс!
  //       </p>
  //     )
  //   }

  return (
    <div className="calendar_container">
      <span className="calendar_container_title">
        Календарь выполненных тренировок
      </span>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={activityDates.map((date) => ({ date }))}
        monthLabels={russianMonths}
        weekdayLabels={russianDays}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value || !value.date) {
            return 'color-empty'
          }
          return 'color-filled'
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null

          const formattedDate = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'short',
          }).format(new Date(value.date))

          return {
            'data-tooltip-content': `${formattedDate}: тренировка выполнена`,
          }
        }}
      />
      {/* Этот компонент «ловит» все атрибуты data-tooltip-content и показывает их */}
      <Tooltip
        anchorSelect="rect"
        place="top" // Всегда показывать над квадратиком
        delayShow={100} // Небольшая задержка перед появлением
        noArrow={true} // Оставить стрелочку
        variant="light" // Базовая светлая тема (допилили в CSS)
      />
    </div>
  )
}

export default ActivityCalendar
