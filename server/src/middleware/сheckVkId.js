const checkVkId = (req, res, next) => {
  // Express автоматически переводит заголовки в нижний регистр
  const vkId = req.headers['x-vk-user-id']
  if (!vkId) {
    return res.status(400).json({
      message: 'Доступ запрещен: отсутствует заголовок X-VK-User-Id',
    })
  }
  // Сохраняем ID в объект запроса, чтобы контроллеры его подхватили
  req.vkId = String(vkId)

  next()
}

export default checkVkId
