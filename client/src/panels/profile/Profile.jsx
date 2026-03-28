import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaMedal } from 'react-icons/fa'
import { Panel } from '@vkontakte/vkui'

import styles from './Profile.module.css'
import Avatar from './avatar/Avatar'
import Parameters from './parameters/Parameters'
import Records from './records/Records'
import Pulse from './pulse/Pulse'
import Paces from './paces/Paces'
import Name from './name/Name'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import {
  fetchGetMyProfile,
  fetchCreateProfile,
  checkProfileExists,
  checkVkAuth,
} from '../../redux/slices/userSlice'

const Profile = ({ id }) => {
  const dispatch = useDispatch()
  const hasProfile = useSelector(checkProfileExists)
  const isAuthVk = useSelector(checkVkAuth)
  const [showSportProfile, setShowSportProfile] = useState(false)

  const createSportProfile = () => {
    dispatch(fetchCreateProfile())
    setShowSportProfile(true)
  }

  useEffect(() => {
    if (isAuthVk) {
      dispatch(fetchGetMyProfile())
    }
  }, [])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.profile}>
        <div className={styles.profile_wrap}>
          <div className={styles.avatar_name_wrap}>
            <Avatar />
            <Name />
          </div>

          {!hasProfile && (
            <div className={styles.btn_wrap}>
              <button
                className={styles.btn}
                onClick={createSportProfile}
              >
                <FaMedal className={styles.btn_icon} /> создать и
                заполнить спортивный профиль
              </button>
              <span className={styles.descr}>
                * всегда под рукой будут данные о пульсе, личных
                рекордах и темпе бега, соответствующего пульсовым
                зонам. Эти данные помогут выстроить грамотный
                структурированный тренировачный процесс.
              </span>
            </div>
          )}

          {(showSportProfile || hasProfile) && (
            <>
              <Parameters />

              <Records />

              <Pulse />

              <Paces />
            </>
          )}
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default Profile
