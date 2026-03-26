const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3010',
      'http://sportplans.ru',
      'https://sportplans.ru',
      'https://185.251.89.77',
      'http://185.251.89.77',
      'https://vk.com',
      'https://vk.ru',
    ]

    const allowedPatterns = [
      /vk\.com$/,
      /vk\.me$/,
      /\.vk\.com$/, // Чтобы ловить поддомены
    ]

    // 1. Разрешаем запросы без origin (например, мобильные приложения или curl)
    if (!origin) {
      return callback(null, true)
    }

    // 2. Проверяем прямое вхождение в список строк
    const isAllowedString = allowedOrigins.includes(origin)

    // 3. Проверяем соответствие регулярным выражениям
    const isAllowedPattern = allowedPatterns.some((pattern) =>
      pattern.test(origin),
    )

    if (isAllowedString || isAllowedPattern) {
      callback(null, true)
    } else {
      console.error(`CORS blocked for origin: ${origin}`) // Полезно для отладки
      callback(new Error('CORS policy violation'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'x-vk-user-id',
    'x-vk-app-id',
    'x-vk-sign',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
}

export default corsOptions
