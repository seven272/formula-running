import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import styles from './RunningPlanChart.module.css'

const RunningPlanChart = ({ planWeeks }) => {
  // 1. Защита от пустых данных
  // 1. Проверка: пришел ли массив вообще?
  if (!planWeeks || !Array.isArray(planWeeks)) {
    console.error(
      'RunningPlanChart: planWeeks is not an array!',
      planWeeks,
    )
    return (
      <div style={{ padding: 20 }}>
        Данные для графика отсутствуют
      </div>
    )
  }

  const chartData = planWeeks.map((w) => {
    // 2. Проверка: есть ли сессии внутри недели?
    const sessions = w.sessions || []

    return {
      name: `Нед ${w.weekNumber || 0}`,
      km: w.weeklyKm || 0,
      totalLoad: sessions.reduce((acc, s) => acc + (s.load || 0), 0),
      isRecovery: w.isRecovery || false,
      status: w.status || '',
    }
  })

  return (
    <div
      style={{ width: '100%', height: '350px' }}
      className={styles.section_chart}
    >
      <h3 className={styles.title}>Обзор объема и нагрузки</h3>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
      >
        {/*  комбинированный тип графика */}
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          {/*Рисует фоновые линии. vertical={false} оставляет только горизонтальные линии */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          {/*Горизонтальная ось - недели */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          {/*Горизонтальная левая ось - километры, беговой обьем */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#888"
            fontSize={11}
            unit=" км"
          />
          {/*Горизонтальная правая ось - шкала нагрузки, скрыта */}
          <YAxis yAxisId="right" orientation="right" hide />

          {/*Подсказка*/}
          <Tooltip
            cursor={{ fill: '#f5f5f5' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div
                    style={{
                      backgroundColor: '#fff',
                      padding: '10px',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                        marginBottom: '4px',
                      }}
                    >
                      {data.name}
                    </div>
                    <div
                      style={{ color: '#1976D2', fontSize: '11px' }}
                    >
                      Беговой объем: {data.km} км
                    </div>
                    <div
                      style={{ color: '#FF5252', fontSize: '11px' }}
                    >
                      Нагрузка: {data.totalLoad}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        color: '#666',
                      }}
                    >
                      {data.status}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />

          {/*  Столбцы отображают объем (дистанцию в km). */}
          <Bar yAxisId="left" dataKey="km" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isRecovery ? '#90CAF9' : '#014bde'}
              />
            ))}
          </Bar>
          {/*Отображает интенсивность (load). Она идет «поверх» столбиков, показывая, как меняется качественная нагрузка.*/}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalLoad"
            stroke="#FF5252"
            strokeWidth={3}
            dot={{ r: 4, fill: '#FF5252' }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RunningPlanChart
