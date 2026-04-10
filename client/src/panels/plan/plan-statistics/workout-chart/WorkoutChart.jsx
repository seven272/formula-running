import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { BsDatabaseDash } from 'react-icons/bs'

const WorkoutChart = ({ plan }) => {
  // 1. "Разглаживаем" все сессии из всех недель в один массив
  const allSessions =
    plan?.workouts?.flatMap((week) => week.sessions) || []

  // 2. Берем последние 7 выполненных для динамики
  const data = allSessions
    .filter(
      (s) => s.completed && s.rating !== null && s.mood !== null,
    )
    .slice(-7)
    .map((s, index) => ({
      name: `Тр. ${index + 1}`,
      rating: s.rating || 0,
      mood: s.mood || 0, // В БД это число 1-5
    }))

  if (data.length < 2)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          columnGap: '10px',
          color: '#808080',
        }}
      >
        <BsDatabaseDash size={25} />{' '}
        <span>
          Мало данных. Нужны минимум 2 тренировки c оценкой и
          самочувтсвием.
        </span>
      </div>
    )

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="colorRating"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#4bb34b"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="#4bb34b"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f2f5"
          />
          <XAxis dataKey="name" hide />
          <YAxis hide domain={[0, 5]} />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="rating"
            stroke="#4bb34b"
            fill="url(#colorRating)"
            strokeWidth={3}
            name="Оценка"
          />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#3f8ae0"
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Состояние"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WorkoutChart
