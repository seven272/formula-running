import Auth from '../models/authModel.js'

const checkAdmin = async (req, res, next) => {
  //получаю с ответом из мидлвара checkAuth
  const userId = req.userId

  try {
    const user = await Auth.findById(userId).select('-password')
    if (user && user.isAdmin) {
      next()
    } else {
      return res.status(401).json({
        message: 'Вы не являетесь администратором.',
      })
    }
  } catch (error) {
    
    res
      .status(500)
      .send(
        'Ошибка сервера при попытке авторизации как администратор.'
      )
  }
}

export default checkAdmin
