import { Panel } from '@vkontakte/vkui'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { RiArticleLine } from 'react-icons/ri'

import styles from './InfoList.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const InfoList = ({ id }) => {
  const routeNavigator = useRouteNavigator()
  return (
    <Panel id={id}>
      <Header />
      <div className={styles.info}>
        <h1 className={styles.title}>Полезная информация</h1>
        <div className={styles.wrapper}>
          <div className={styles.href_wrap}>
            <RiArticleLine className={styles.href_icon} />
            <span
              className={styles.href_text}
              onClick={() => routeNavigator.push('/info/offer')}
            >
              Публичная оферта
            </span>
          </div>
          <div className={styles.href_wrap}>
            <RiArticleLine className={styles.href_icon} />
            <span
              className={styles.href_text}
              onClick={() => routeNavigator.push('/info/rpe')}
            >
              Что такое PRE
            </span>
          </div>

          <div className={styles.href_wrap}>
            <RiArticleLine className={styles.href_icon} />
            <span
              className={styles.href_text}
              onClick={() => routeNavigator.push('/info/puls')}
            >
              Пульсовые зоны
            </span>
          </div>

          <div className={styles.href_wrap}>
            <RiArticleLine className={styles.href_icon} />
            <span
              className={styles.href_text}
              onClick={() => routeNavigator.push('/info/pace')}
            >
              Определение тренировачного темпа
            </span>
          </div>
          <div className={styles.href_wrap}>
            <RiArticleLine className={styles.href_icon} />
            <span
              className={styles.href_text}
              onClick={() =>
                routeNavigator.push('/info/strength-training')
              }
            >
              Силовые тренировки для бегуна
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default InfoList
