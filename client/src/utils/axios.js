import axios from 'axios'
import store from '../redux/store'
const BASE_URL =
  // local development/production
  // import.meta.env.MODE === 'development'
  //   ? 'http://localhost:5000/api'
  //   : '/api'

  //public devolopment / production
  import.meta.env.MODE === 'development'
    ? 'https://sportplans.ru/api'
    : '/api'

const instance = axios.create({
  baseURL: BASE_URL,
})

//каждый раз когда делаем запрос через axios вшиваем в headers токен
instance.interceptors.request.use((config) => {
  // 1. Для авторизации через форму регистрации. Берем токен из локального хранилища
  const token = window.localStorage.getItem('token-runplans')
  if (token) {
    config.headers.Authorization = token
  }

  // 2. Для авторизации при запуске в Вконтаке, когда использую vk-id
  //2.1 если запускаем через приложение
  // const urlParams = new URLSearchParams(window.location.search)
  // const vkId = urlParams.get('vk_user_id')
  //2.2 для теста берем из хранилища redux
  const state = store.getState()
  const vkId = state.user.preVkId

  if (vkId) {
    // Вшиваем ID в кастомный заголовок, где Х правило хорошего тона при наименовании кастомных заголовков
    config.headers['X-VK-User-Id'] = vkId
  }

  return config
})

export default instance
