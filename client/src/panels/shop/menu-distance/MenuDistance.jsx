import React from 'react'
import { TbRun } from 'react-icons/tb'
import { MdDirectionsBike } from 'react-icons/md'
import { GiMountainRoad } from 'react-icons/gi'

import styles from './MenuDistance.module.css'

const MenuDistance = ({
  activeSport,
  activeDistance,
  onSelectFilter,
}) => {
  // Динамически определяем массив дистанций в зависимости от вида спорта
  const getDistancesBySport = () => {
    switch (activeSport) {
      case 'trail':
        return ['10-15км', '20-30км', '50км', 'Ультра']
      case 'tri':
        return ['Спринт', 'Олимпийская', 'Half', 'Ironman']
      case 'run':
      default:
        return ['5км', '10км', '21км', '42км']
    }
  }

  const distances = getDistancesBySport()

  // Динамическая иконка для кнопок дистанции
  const getIcon = () => {
    if (activeSport === 'trail')
      return <GiMountainRoad className={styles.icon} />
    if (activeSport === 'tri')
      return <MdDirectionsBike className={styles.icon} />
    return <TbRun className={styles.icon} />
  }

  return (
    <div className={styles.sort_plans}>
      <div className={styles.menu_sort}>
        <span className={styles.title}>по дистанциям:</span>
        <ul className={styles.items}>
          {distances.map((dist) => (
            <li
              key={dist}
              className={
                activeDistance === dist
                  ? styles.item_active
                  : styles.item
              }
              onClick={() => onSelectFilter(dist)}
            >
              {getIcon()}
              <span className={styles.text}>{dist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuDistance
