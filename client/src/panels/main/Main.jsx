import { Panel } from '@vkontakte/vkui'
import { useSelector } from 'react-redux'
import styles from './Main.module.css'

import FirstStart from './first-start/FirstStart'
import SecondStart from './second-start/SecondStart'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Main = ({ id }) => {
  const hasCurrentPlan = useSelector(
    (state) => state.currentPlan.currentId,
  )
  return (
    <Panel id={id}>
      <Header />
      <div className={styles.section_main}>
        {hasCurrentPlan ? <SecondStart /> : <FirstStart />}
      </div> 
      <Footer />
    </Panel>
  )
}

export default Main
