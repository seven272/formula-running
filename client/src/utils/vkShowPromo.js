import bridge from '@vkontakte/vk-bridge'

const showPromo = async () => {
  try {
    const data = await bridge.send('VKWebAppShowBannerAd', {
      banner_location: 'bottom',
      layout_type: 'resize', // экран игры или мини-приложения станет меньше на размер баннера.overlay / resize
      height_type: 'compact', //баннер с уменьшенной высотой
    })
    if (data.result) {
      // Баннерная реклама отобразилась
      console.log('Показывается реклама')
    }
  } catch (error) {
    // Ошибка
    console.log(error)
    console.log('Ошибка при показе рекламы')
  }
}

export { showPromo }
