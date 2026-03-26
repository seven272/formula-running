import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Panel } from '@vkontakte/vkui'

import Login from './login/Login.jsx'
import Register from './register/Register.jsx'
import Logout from './logout/Logout.jsx'
import styles from './Auth.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
const Auth = ({ id }) => {
  const [showPage, setShowPage] = useState('login') //login, register, logout
  const haveToken = useSelector((state) => state.auth.token)
  const handleShowPage = (val = 'login') => {
    setShowPage(val)
  }

  useEffect(() => {
    if (haveToken) {
      setShowPage('logout')
    }
  }, [])

  useEffect(() => {
    if (haveToken) {
      setShowPage('logout')
    }
  }, [haveToken])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.auth_main}>
        <div className={styles.auth_wrap}>
          {showPage === 'login' && <Login show={handleShowPage} />}
          {showPage === 'register' && (
            <Register show={handleShowPage} />
          )}
          {showPage === 'logout' && <Logout show={handleShowPage} />}
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default Auth
