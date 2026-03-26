import bridge from '@vkontakte/vk-bridge'

const showPromo = () => {
  bridge
    .send('VKWebAppShowBannerAd', {
      banner_location: 'bottom',
      height_type: 'regular',
      banner_width: '650',
      banner_height: '70',
      banner_align: 'center',
      orientation: 'horizontal',
      layout_type: 'overlay',
    })
    .then((data) => {
      if (data.result) {
        // Баннерная реклама отобразилась
        console.log('Показывается реклама')
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error)
      console.log('Ошибка в показе рекламы реклама')
    })
}

export { showPromo }
