import React, { useEffect, useState } from 'react'
import { useParams } from '@vkontakte/vk-mini-apps-router'
import { Panel } from '@vkontakte/vkui'

import styles from './Info.module.css'
import RpeInfo from './rpe-info/RpeInfo'
import TempInfo from './temp-info/TempInfo'
import MpkInfo from './mpk-info/MpkInfo'
import NotFound from '../../components/not-found/NotFound'
import PulseInfo from './pulse-info/PulseInfo'
import StrengthTraining from './strength-training/StrengthTraining'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Info = ({ id }) => {
  const params = useParams()
  const [comp, setComp] = useState(null)

  const renderComponent = () => {
    let alias = params.alias
    if (alias === 'rpe') {
      setComp(<RpeInfo />)
    } else if (alias === 'pace') {
      setComp(<TempInfo />)
    } else if (alias === 'mpk') {
      setComp(<MpkInfo />)
    } else if (alias === 'puls') {
      setComp(<PulseInfo />)
    } else if (alias === 'strength-training') {
      setComp(<StrengthTraining />)
    } else {
      setComp(<NotFound />)
    }
  }

  useEffect(() => {
    renderComponent()
  }, [params])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.info}>{comp !== null && comp}</div>
      <Footer />
    </Panel>
  )
}

export default Info
