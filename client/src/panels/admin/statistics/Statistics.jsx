import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { Spinner } from '@vkontakte/vkui'

import styles from './Statistics.module.css'
import ListUsers from './list-users/ListUsers'
import ListPurchasedPlans from './list-purchased-plans/ListPurchasedPlans'
import ListGeneratedPlans from './list-generated-plans/ListGeneratedPlans'
import axios from '../../../utils/axios'

const Statistics = ({ closeFn }) => {
  const [valueBtn, setValueBtn] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null) // { users, purchasedPlans, generatedPlans}

  const fetchStaticticsData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('/auth/statistics')
      console.log(res.data)

      if (res.data) {
        setData(res.data)
        setIsLoading(false)
        return res.data
      }
    } catch (error) {
      console.log('ошибка при получении статистики ', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>
        Статистика <MdClose size={20} onClick={() => closeFn('')} />
      </span>

      <button
        className={styles.main_btn}
        onClick={fetchStaticticsData}
      >
        получить данные
      </button>

      <div className={styles.data}>
        <div className={styles.data_wrap}>
          <span className={styles.data_title}>
            кол-во пользователей: {data?.users.length || 0}
          </span>
          <button
            className={styles.data_btn}
            name="users"
            onClick={() => setValueBtn('users')}
          >
            смотреть
          </button>
        </div>
        <div className={styles.data_wrap}>
          <span className={styles.data_title}>
            купленных планов: {data?.purchasedPlans.length || 0}
          </span>
          <button
            className={styles.data_btn}
            name="purchased"
            onClick={() => setValueBtn('purchased')}
          >
            смотреть
          </button>
        </div>
        <div className={styles.data_wrap}>
          <span className={styles.data_title}>
            созданных планов: {data?.generatedPlans.length || 0}
          </span>
          <button
            className={styles.data_btn}
            name="generated"
            onClick={() => setValueBtn('generated')}
          >
            смотреть
          </button>
        </div>
      </div>

      {valueBtn === 'users' && (
        <ListUsers closeFn={setValueBtn} users={data.users} />
      )}
      {valueBtn === 'purchased' && <ListPurchasedPlans plans={data.purchasedPlans}/>}
      {valueBtn === 'generated' && <ListGeneratedPlans plans={data.generatedPlans}/>}
    </div>
  )
}

export default Statistics
