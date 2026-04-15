const vkCheckKeyGroup = (req, res, next) => {
  const { secret, type } = req.body;
  const VK_KEY_GROUP_SECRET = process.env.VK_KEY_GROUP_SECRET; // Ваш новый ключ из настроек Callback API

  // Пропускаем проверку только для типа confirmation (хотя ВК пришлет ключ и в нем)
  if (type === 'confirmation') return next();

  if (!secret || secret !== VK_KEY_GROUP_SECRET) {
    console.error('Ошибка безопасности: неверный Secret Key от ВК');
    return res.status(403).send('Invalid secret');
  }

  next();
};

export default vkCheckKeyGroup