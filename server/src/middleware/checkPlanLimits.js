const checkPlanLimits = (planType) => async (req, res, next) => {
  try {
    const user = await User.findOne({ vkId: req.vkId })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Пользователь не найден' })

    let currentUsed = 0
    let maxLimit = 0

    if (planType === 'ready') {
      // Считаем количество ID в массиве купленных готовых планов
      currentUsed = user.purchasedReadyPlans
        ? user.purchasedReadyPlans.length
        : 0
      maxLimit = user.readyPlansLimit
    } else if (planType === 'custom') {
      // Считаем количество ID в массиве сгенерированных планов
      currentUsed = user.customPlans ? user.customPlans.length : 0
      maxLimit = user.customPlansLimit
    }

    if (currentUsed >= maxLimit) {
      return res.status(403).json({
        message: `Лимит исчерпан. Доступно: ${maxLimit}, уже создано: ${currentUsed}`,
        errorType: 'LIMIT_EXCEEDED',
      })
    }

    next()
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Ошибка сервера при проверке лимитов' })
  }
}
export default checkPlanLimits
