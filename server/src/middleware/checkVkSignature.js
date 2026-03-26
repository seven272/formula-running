import crypto from 'node:crypto';

export const verifyVkSignature = (req, res, next) => {
  const { sign, ...queryParams } = req.query; 
  
  if (!sign) {
    return res.status(401).json({ message: 'Отсутствует подпись VK' });
  }

  // Сортировка и сборка строки параметров
  const orderedKeys = Object.keys(queryParams)
    .filter(key => key.startsWith('vk_'))
    .sort()
    .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  const secretKey = process.env.VK_SECRET_KEY;
  
  // Генерация хеша
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(orderedKeys)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  if (hash !== sign) {
    return res.status(403).json({ message: 'Ошибка валидации подписи' });
  }

  req.vkId = parseInt(queryParams.vk_user_id, 10);
  next();
};