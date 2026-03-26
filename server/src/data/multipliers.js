  const multipliers = {
    level: { beginner: 0.8, intermediate: 1.0, advanced: 1.2 },
    distance: { '10km': 0.7, '21km': 1.0, '42km': 1.4 },
    meters: { '10km': 10000, '21km': 21097, '42km': 42195 },
    names: {
      '10km': '10 километров',
      '21km': 'полумарафон',
      '42km': 'марафон',
    },
  }

  // Минимальные пороги для "длительной" (Long Run) в зависимости от цели
  const minLongRunLimits = {
    '10km': 8,
    '21km': 14,
    '42km': 22,
  }
  // Максимальные пороги для "длительной" (Long Run) в зависимости от цели
  const maxLongRunLimits = {
    '10km': 20,
    '21km': 22,
    '42km': 29,
  }

  
  export {multipliers, maxLongRunLimits, minLongRunLimits}