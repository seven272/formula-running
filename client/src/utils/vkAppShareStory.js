import bridge from '@vkontakte/vk-bridge'

import { convertBase64FromUrl } from './convertToBase64'

import ImgBlob from '../assets/images/run_plan.jpg'

// размещение записи в истории пользователя

const shareTrainingStory = async (props) => {
  const trainingData = {
    title: 'Темповая тренировка',
    distance: '13',
    pace: '4.23 /км',
  }
  const urlApp = 'https://vk.com/app53406141'
  try {
    // 1. Подготавливаем данные для текста
    const title = `Тренировка: ${trainingData.title}`
    const stats = `Дистанция: ${trainingData.distance} км | Темп: ${trainingData.pace}`

    // 2. Конвертируем фон (лучше кэшировать base64, если картинка статична)
    const img = await convertBase64FromUrl(ImgBlob)

    await bridge.send('VKWebAppShowStoryBox', {
      // Задаёт фон истории
      background_type: 'image', // тип фона — картинка
      blob: img, // само изображение в формате blob
      // Кнопка внизу истории для перехода в игру
      attachment: {
        type: 'url', //тип кнопки
        text: 'open', // текст на кнопке "Открыть", ("game" — «Играть» "go_to" — Перейти)
        url: urlApp, //ссылка на приложение
      },
      stickers: [
        // Основной заголовок (Сверху)
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text: title,
              style: 'border', // Четкий спортивный стиль
              selection_color: '#000000', // Черный фон текста
            },
            transform: {
              gravity: 'center_top',
              translation_y: 0.1,
              relation_width: 0.8, // Ограничиваем ширину, чтобы текст не вылезал
            },
          },
        },
        // Статистика (Чуть ниже центра или снизу)
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text: stats,
              style: 'classic',
              background_style: 'none',
              selection_color: '#ffffff',
            },
            transform: {
              gravity: 'center_bottom',
              translation_y: -0.2,
              scale: 1.2, // Делаем акцент на цифрах
            },
          },
        },
      ],
    })

    return true
  } catch (error) {
    console.error('Ошибка при шеринге:', error)
    return false
  }
}

export { shareTrainingStory }
