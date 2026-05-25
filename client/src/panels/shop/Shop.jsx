import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GrUpdate } from 'react-icons/gr'
import { Panel } from '@vkontakte/vkui'

import ResultSort from './result-sort/ResultSort'
import MenuType from './menu-type/MenuType'
import MenuSport from './menu-sport/MenuSport' 
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

  // 1. Новая структура стейта — все фильтры работают независимо
  const [filters, setFilters] = useState({
    category: 'all', // all, unavailable, available
    sport: 'run', // run, trail, tri (по умолчанию показываем асфальт)
    distance: '', // пустая строка означает "выбраны все дистанции"
  })

  // Сброс фильтров возвращает к исходному состоянию
  const handleClear = () => {
    setFilters({ category: 'all', sport: 'run', distance: '' })
  }

  // Смена вида спорта сбрасывает выбранную дистанцию, так как сетка дистанций меняется!
  const handleSelectSport = (sportId) => {
    setFilters((prev) => ({ ...prev, sport: sportId, distance: '' }))
  }

  // 2. Мощный useMemo для пересекающейся фильтрации
  const resultSort = useMemo(() => {
    let filtered = [...allPlans]

    // ФИЛЬТР 1: По виду спорта (выполняется всегда)
    filtered = filtered.filter(
      (plan) => plan.typeSport === filters.sport,
    )

    // ФИЛЬТР 2: По категории доступности
    if (filters.category === 'unavailable') {
      // Только активированные
      filtered = filtered.filter((plan) =>
        (purchasedPlans || []).some(
          (elem) => elem.originalPlanId === plan._id,
        ),
      )
    } else if (filters.category === 'available') {
      // Только доступные для покупки/активации
      filtered = filtered.filter(
        (plan) =>
          !(purchasedPlans || []).some(
            (elem) => elem.originalPlanId === plan._id,
          ),
      )
    }

    // ФИЛЬТР 3: По дистанции (если она выбрана)
    if (filters.distance) {
      filtered = filtered.filter(
        (plan) => plan.distance === filters.distance,
      )
    }

    return filtered
  }, [filters, allPlans, purchasedPlans])

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

        {/* Фильтр Категорий владения */}
        <MenuType
          filter={{ value: filters.category }} // Передаем структуру для обратной совместимости
          onSelectFilter={(val) =>
            setFilters((prev) => ({ ...prev, category: val }))
          }
        />

        {/* Фильтр Видов Спорта */}
        <MenuSport
          activeSport={filters.sport}
          onSelectSport={handleSelectSport}
        />

        {/* Динамический Фильтр Дистанций */}
        <MenuDistance
          activeSport={filters.sport}
          activeDistance={filters.distance}
          onSelectFilter={(val) => {
            // Если кликнули на уже активную дистанцию — снимаем фильтр (тогл)
            setFilters((prev) => ({
              ...prev,
              distance: prev.distance === val ? '' : val,
            }))
          }}
        />

        {/* Результаты рендерятся ВСЕГДА, пустой экран больше не показываем */}
        <ResultSort sortList={resultSort} />
      </div>
      <Footer />
    </Panel>
  )
}

export default Shop
