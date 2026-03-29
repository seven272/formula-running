import bridge from '@vkontakte/vk-bridge'
import ImgOnboarding from '../assets/images/vk-ui/onboarding.png'
import { convertBase64FromUrl } from './convertToBase64'
// ф-ий отправки флага о показе Онбординга в ВКсторадж и ф-я получения информации о показе
import { setOnboardingShown, getOnboardingShown } from './vkStorage'

const showOnboarding = async () => {
  console.log('Запуск функции показа Онбордиган')
  try {
    const imgForOnboarding = await convertBase64FromUrl(ImgOnboarding)
    // получаем информацию о "флаге" из хранилища о том были ли уже показа онбодинг, если да то прекращаю выполнения ф-и
    const isShown = getOnboardingShown()
    if (!isShown) {
      return
    }

    const data = await bridge.send('VKWebAppShowSlidesSheet', {
      slides: [
        {
          media: {
            blob: `${imgForOnboarding}`,
            type: 'image',
          },
          title: 'Добро пожаловать!',
          subtitle:
            'В приложении вы сможете купить готовый беговой план или создать свой собственный, а также всегда будете иметь под рукой множество беговых метрик, которые сделают тренировки максимально эффективными.',
        },
      ],
    })
    if (data.result) {
      // Слайды показаны
      setOnboardingShown()
    }
  } catch (error) {
    // Ошибка
    console.log(error)
  }
}

export { showOnboarding }
