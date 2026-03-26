import bridge from '@vkontakte/vk-bridge'
import ImgOnboarding from '../assets/images/onboarding.jpg'
import ImgOnboarding2 from '../assets/images/onboarding2.jpg'
import { getBase64FromUrl } from './imgToBase64'
// ф-ий отправки флага о показе Онбординга в ВКсторадж и ф-я получения информации о показе
import { setOnboardingShown, getOnboardingShown } from './vkStorage'
//импорт конвертированного изображения в формате base64
// import { imgBase64 } from '../assets/data/imgBase64'

const showOnboarding = async () => {
  const imgForOnboarding = await getBase64FromUrl(ImgOnboarding)
  const imgForOnboarding2 = await getBase64FromUrl(ImgOnboarding2)
  // получаем информацию о "флаге" из хранилища о том были ли уже показа онбодинг, если да то прекращаю выполнения ф-и
  const isShown = getOnboardingShown()
  if (isShown) {
    return
  }
  bridge
    .send('VKWebAppShowSlidesSheet', {
      slides: [
        {
          media: {
            blob: `${imgForOnboarding}`,
            type: 'image',
          },
          title: 'Считаем расход питания при беге',
          subtitle:
            'Благодоря данному приложению вы сможете быстро узнать сколько калорий и углеводов потратите во время актвиности и сколько питания потребуется, чтобы их восполнить.',
        },
        {
          media: {
            blob: `${imgForOnboarding2}`,
            type: 'image',
          },
          title: 'Считаем деньги на спортивное питание',
          subtitle:
            'Также вы сможете произвести расчет для различных типов питания и узнать примерный бюджет.',
        },
      ],
    })
    .then((data) => {
      if (data.result) {
        // Слайды показаны
        setOnboardingShown()
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error)
    })
}

export { showOnboarding }
