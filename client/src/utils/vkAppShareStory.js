import bridge from '@vkontakte/vk-bridge'

import { convertBase64FromUrl } from './convertToBase64'

import ImgBlob from '../assets/images/vk-ui/onboarding.png'
import ImgBlob2 from '../assets/images/vk-ui/story4.jpeg'

// размещение записи в истории пользователя

const shareTrainingStory = async ({ title = '', descr = '' }) => {
  const urlApp = 'https://vk.com/app53406141'
  try {
    // 1. Подготавливаем данные для текста
    const trainingTitle = `Тренировка "${title}" выполнена!`
    const trainingDescr = `${descr}`

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
              text: trainingTitle, // Переменная с названием
              style: 'border', // Жирный шрифт с обводкой, хорошо читается
              selection_color: '#ffffff',
            },
            transform: {
              gravity: 'center_top',
              translation_y: 0.1,
              scale: 1.5, // ДЕЛАЕМ КРУПНЕЕ
              relation_width: 0.8, // Ограничиваем ширину (80% экрана)
            },
          },
        },
        // Содержание тренировки (Чуть ниже центра или снизу)
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text: trainingDescr, // Переменная с длинным описанием
              style: 'classic',
              background_style: 'none',
              selection_color: '#ffffff',
            },
            transform: {
              gravity: 'center_bottom',
              translation_y: -0.1,
              scale: 0.6, // Оставляем стандартным, чтобы влезло больше строк
              relation_width: 0.9, // Растягиваем почти на всю ширину (90%)
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

const shareFinishPlanStory = async (titlePlan = '' ) => {
  const urlApp = 'https://vk.com/app53406141'
  try {
    // 2. Конвертируем фон (лучше кэшировать base64, если картинка статична)
    const img = await convertBase64FromUrl(ImgBlob2)

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
              text: 'Подготовка к забегу завершена!', // Переменная с названием
              style: 'border', // Жирный шрифт с обводкой, хорошо читается
              selection_color: '#ffffff',
            },
            transform: {
              gravity: 'center_top',
              translation_y: 0.1,
              scale: 1.5, // ДЕЛАЕМ КРУПНЕЕ
              relation_width: 0.8, // Ограничиваем ширину (80% экрана)
            },
          },
        },
        // Содержание тренировки (Чуть ниже центра или снизу)
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text: titlePlan, // Переменная с названием плана
              style: 'classic',
              background_style: 'none',
              selection_color: '#ffffff',
            },
            transform: {
              gravity: 'center_bottom',
              translation_y: -0.15,
              scale: 1.1, // Оставляем стандартным, чтобы влезло больше строк
              relation_width: 0.9, // Растягиваем почти на всю ширину (90%)
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

export { shareTrainingStory, shareFinishPlanStory }
