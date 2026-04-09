import React, { useMemo } from 'react'

import WorkoutChart from './workout-chart/WorkoutChart'
import MoodPieChart from './mood-pie-chart/MoodPieChart'
import styles from './PlanStatistics.module.css'

const PlanStatistics = ({ plan, onClose }) => {
  const stats = useMemo(() => {
    // 1. Собираем все тренировки из всех недель в один плоский массив
    const allSessions =
      plan?.workouts?.flatMap((week) => week.sessions) || []

    // 2. Фильтруем выполненные
    const completed = allSessions.filter(
      (s) => s.completed && s.type !== 'rest',
    )

    const totalCount = allSessions.length
    const doneCount = completed.length
    const percent =
      totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

    //  Фильтруем только те завершенные тренировки, где есть рейтинг (не null)
    const ratedSessions = completed.filter((s) => s.rating !== null)

    // 3. Средняя оценка
    const avgRating =
      ratedSessions.length > 0
        ? (
            ratedSessions.reduce((acc, s) => acc + s.rating, 0) /
            ratedSessions.length
          ).toFixed(1)
        : '—' // Возвращаем прочерк, если оценок еще нет

    // 4. Расшифровка настроения (так как в БД это Number)
    const moodLabels = {
      1: 'Очень устал',
      2: 'Устал',
      3: 'Нормально',
      4: 'Бодро',
      5: 'Отлично',
    }

    // 5. Считаем преобладающее настроение
    const moodMap = completed.reduce((acc, s) => {
      if (s.mood !== null) {
        acc[s.mood] = (acc[s.mood] || 0) + 1
      }
      return acc
    }, {})

    const topMoodValue = Object.keys(moodMap).reduce(
      (a, b) => (moodMap[a] > moodMap[b] ? a : b),
      null,
    )

    return {
      percent,
      doneCount,
      totalCount,
      avgRating,
      topMood: topMoodValue ? moodLabels[topMoodValue] : '—',
    }
  }, [plan])

  if (!plan) return null

  return (
    <div className={styles.stats_container}>
      <button className={styles.btn_close} onClick={onClose}>
        Закрыть
      </button>
      <div className={styles.progress_section}>
        <div className={styles.progress_labels}>
          <span>Прогресс плана</span>
          <span>{stats.percent}%</span>
        </div>
        <div className={styles.progress_bar}>
          <div
            className={styles.progress_fill}
            style={{ width: `${stats.percent}%` }}
          />
        </div>
        <p className={styles.progress_sub}>
          Выполнено {stats.doneCount} из {stats.totalCount} тренировок
        </p>
      </div>

      <div className={styles.cards_row}>
        <div className={styles.stat_card}>
          <span className={styles.card_icon}>⭐</span>
          <span className={styles.card_value}>{stats.avgRating}</span>
          <span className={styles.card_label}>Средняя оценка</span>
        </div>
        <div className={styles.stat_card}>
          <span className={styles.card_icon}>🎭</span>
          <span
            className={styles.card_value}
            style={{ fontSize: '14px' }}
          >
            {stats.topMood}
          </span>
          <span className={styles.card_label}>Самочувствие</span>
        </div>
      </div>

      <div className={styles.charts_row}>
        <div className={styles.chart_container}>
          <p className={styles.chart_label}>
            Динамика (последние 7 тренировок)
          </p>
          <WorkoutChart plan={plan} />
        </div>

        <div className={styles.chart_container}>
          <p className={styles.chart_label}>
            Оценка самочувтсвия, всего за план
          </p>
          <MoodPieChart plan={plan} />
        </div>
      </div>
    </div>
  )
}

export default PlanStatistics
