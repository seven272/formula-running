import bridge from '@vkontakte/vk-bridge'

const shareApp = async (url) => {
  try {
    const data = await bridge.send('VKWebAppShare', {
      link: `${url}`,
    })
    return data.result
  } catch (error) {
    console.log(error)
  }
}

const sharePostOnWall = async (text, url) => {
  return await bridge
    .send('VKWebAppShowWallPostBox', {
      message: `${text}`,
      attachments: `${url}`,
    })
    .then((data) => {
      if (data.post_id) {
        // Запись размещена
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error)
    })
}

const addFavoriteApp = async () => {
  try {
    const data = await bridge.send('VKWebAppAddToFavorites')
    // Если запрос прошел, возвращаем результат (true/false)
    return data.result
  } catch (error) {
    console.error('Ошибка добавления в избранное:', error)
    return false
  }
}

const recommendApp = async () => {
  try {
    const data = await bridge.send('VKWebAppRecommend')
    // Если всё прошло успешно, VK вернет { result: true }
    return data.result
  } catch (error) {
    // Пользователь закрыл окно или произошла ошибка
    console.error('Ошибка при рекомендации приложения:', error)
    return false
  }
}

export { shareApp, sharePostOnWall, recommendApp, addFavoriteApp }
