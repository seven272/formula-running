import jwt from 'jsonwebtoken'

import Auth from '../models/authModel.js'

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
  //1 вариант расшифровки токена
  const token = (req.headers.authorization || '').replace(
    /Bearer\s?/,
    '',
  )
  //2 вариант расшифровки токена. Yдаляю из токена слово Bearer
  // const token = (req.headers.authorization || '').split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //вшиваю в запрос поле userId
      req.userId = decoded.userId
      next()
    } catch (error) {
      return res.status(400).json({
        message: 'Не удалось авторизоваться',
      })
    }
  } else {
    console.log('Не удалось получить токен при авторизации')
  }
}
export default checkAuth
