import bridge from "@vkontakte/vk-bridge";

const shareApp = async (url) => {
   return await bridge.send('VKWebAppShare', {
        link: `${url}`
        })
        .then((data) => { 
          if (data.result) {
            // Запись размещена
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
}

const sharePostOnWall = async (text, url) => {
    return await bridge.send('VKWebAppShowWallPostBox', {
        message: `${text}`,
        attachments:  `${url}`
        })
        .then((data) => { 
          if (data.post_id) {
            // Запись размещена
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
}

export {shareApp, sharePostOnWall}