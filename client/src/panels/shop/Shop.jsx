import { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { GrUpdate } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { Panel } from '@vkontakte/vkui'

import ResultSort from './result-sort/ResultSort'
import MenuType from './menu-type/MenuType'
import MenuDistance from './menu-distance/MenuDistance'
import styles from './Shop.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import {
  fetchGetPurchasedPlans,
  fetchGetAllPlans,
} from '../../redux/slices/plansSlice'

const Shop = ({ id }) => {
  const dispatch = useDispatch()
  const { allPlans, purchasedPlans } = useSelector(
    (state) => state.plans,
  )
  const [filter, setFilter] = useState({ type: '', value: '' })

  const handleClear = () => {
    setFilter({ type: '', value: '' })
  }

  const resultSort = useMemo(() => {
    const { type, value } = filter

    if (!type) return []

    // Фильтрация по категории (платные/бесплатные/все)
    if (type === 'category') {
      if (value === 'all') return allPlans
      if (value === 'unavailable') {
        const filteredPlans = allPlans.filter((plan) =>
          purchasedPlans.some((elem) => elem._id === plan._id),
        )
        return filteredPlans
      }

      if (value === 'available') {
        const filteredPlans = allPlans.filter((plan) =>
          !purchasedPlans.some((elem) => elem._id === plan._id),
        )
        return filteredPlans
      }
    }

    // Фильтрация по дистанции
    if (type === 'distance') {
      return allPlans.filter((plan) => plan.distance === value)
    }

    return []
  }, [filter, allPlans])

  useEffect(() => {
    dispatch(fetchGetPurchasedPlans())
    dispatch(fetchGetAllPlans())
  }, [dispatch])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.shop}>
        <div className={styles.btn_wrap}>
          <button className={styles.btn_clear} onClick={handleClear}>
            <GrUpdate className={styles.btn_clear_icon} />
            сбросить
          </button>
        </div>
        <MenuType
          filter={filter}
          onSelectFilter={(val) =>
            setFilter({ type: 'category', value: val })
          }
        />
        <MenuDistance
          filter={filter}
          onSelectFilter={(val) =>
            setFilter({ type: 'distance', value: val })
          }
        />
        {filter.type !== '' && <ResultSort sortList={resultSort} />}
      </div>
      <Footer />
    </Panel>
  )
}

export default Shop
