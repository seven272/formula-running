import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '@vkontakte/vkui'

import styles from './Admin.module.css'
import CreatePlan from './create-plan/CreatePlan'
import ListPlans from './list-plans/ListPlans'
import { getMe } from '../../redux/slices/authSlice'
import Error403 from '../../components/error-403/Error403'
import Statistics from './statistics/Statistics'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Admin = ({ id }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [valueBtn, setValueBtn] = useState('')

  useEffect(() => {
    dispatch(getMe())
  }, [])

  if (!user || !user.isAdmin) {
    return (
      <Panel id={id}>
        <Header />
        <Error403 />
        <Footer />
      </Panel>
    )
  }

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.section}>
        <h1 className={styles.title}>Страница администратора</h1>
        <div className={styles.wrap_btns}>
          <button
            className={styles.top_btn}
            name="listplans"
            onClick={() => setValueBtn('listplans')}
          >
            готовые планы
          </button>
          <button
            className={styles.top_btn}
            name="createplan"
            onClick={() => setValueBtn('createplan')}
          >
            создать план
          </button>

          <button
            className={styles.top_btn}
            name="statistics"
            onClick={() => setValueBtn('statistics')}
          >
            статистика
          </button>
        </div>
        {valueBtn === 'createplan' && (
          <CreatePlan closeFn={setValueBtn} />
        )}
        {valueBtn === 'listplans' && (
          <ListPlans closeFn={setValueBtn} />
        )}
        {valueBtn === 'statistics' && (
          <Statistics closeFn={setValueBtn} />
        )}
      </div>
      <Footer />
    </Panel>
  )
}

export default Admin
