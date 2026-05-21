import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const MoodPieChart = ({ plan }) => {
  const moodData = React.useMemo(() => {
    const allSessions =
      plan?.workouts?.flatMap((week) => week.sessions) || []
    const completed = allSessions.filter((s) => s.completed && s.mood !== 0)

    const moodLabels = {
      1: 'Очень устал',
      2: 'Устал',
      3: 'Нормально',
      4: 'Бодро',
      5: 'Отлично',
    }

    const counts = completed.reduce((acc, s) => {
      const label = moodLabels[s.mood] || 'Не указано'
      acc[label] = (acc[label] || 0) + 1
      return acc
    }, {})

    return Object.keys(counts).map((name) => ({
      name,
      value: counts[name],
    }))
  }, [plan])

  const COLORS = {
    Отлично: '#4bb34b',
    Бодро: '#3f8ae0',
    Нормально: '#90caf9',
    Устал: '#ffc107',
    'Очень устал': '#ff5252',
  }

  if (moodData.length === 0) return null

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={moodData}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
          >
            {moodData.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name] || '#818c99'}
              />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default MoodPieChart
