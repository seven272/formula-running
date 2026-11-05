import jwt from 'jsonwebtoken'



//1 вариант авторизации через куки, необходимо также настроить cors разрешить принимать куки и axios,разрешив отправлять куки (credentials: true)
// const checkAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies['jwt-sportplans']
//     console.log(token)
//     if (!token) {
//       return res.status(401).json({
//         message: 'Не удалось авторизоваться - токен не существует',
//       })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     console.log(decoded)
//     if (!decoded) {
//       return res.status(401).json({
//         message: 'Не удалось авторизоваться - токен не валиден',
//       })
//     }
//     // ищем пользователя в базе данных по id, этот id был вшит в токен при создании, и возвращаем найденного пользователя, за исключением поля password, исключаем его в целях безопасности
//     const user = await Auth
//       .findById(decoded.userId)
//       .select('-password')

//     if (!user) {
//       return res.status(401).json({
//         message: 'Пользователь не найден',
//       })
//     }

//     req.user = user
//     next()
//   } catch (error) {
//     console.log('Ошибка checkAuth middleware:', error.message)
//     res.status(500).json({ message: 'Ошибка сервера' })
//   }
// }

//2 вариант через авторизацию в headers, вшивая токен в заголовok при отправки запроса в axios

const checkAuth = (req, res, next) => {
  // Безопасно достаем токен из заголовка Authorization
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace(/Bearer\s?/, '')

  if (!token) {
    // ВАЖНО: Если токена нет, сразу возвращаем 401 ошибку и пишем в консоль
    console.warn('Авторизация отклонена: токен отсутствует в заголовках')
    return res.status(401).json({
      message: 'Доступ запрещен: отсутствует авторизационный токен',
    })
  }

  try {
    // Проверяем ваш внутренний JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Записываем userId в объект запроса для последующих контроллеров
    req.userId = decoded.userId
    
    // Передаем управление следующему обработчику/контроллеру
    next()
  } catch (error) {
    console.error('Ошибка верификации JWT токена:', error.message)
    return res.status(403).json({
      message: 'Токен недействителен или его срок действия истек',
    })
  }
}

export default checkAuth
