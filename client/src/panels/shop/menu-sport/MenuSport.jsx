import React from 'react'
import { TbRun } from 'react-icons/tb'
import { GiMountainRoad } from 'react-icons/gi' // Примеры иконок
import { MdDirectionsBike } from 'react-icons/md'

import styles from './MenuSport.module.css' // Стили будут идентичны вашим

const MenuSport = ({ activeSport, onSelectSport }) => {
  const sports = [
    { id: 'run', text: 'Бег', icon: <TbRun size={20}/> },
    { id: 'trail', text: 'Трейл', icon: <GiMountainRoad size={20}/> },
    { id: 'tri', text: 'Триатлон', icon: <MdDirectionsBike size={20}/> },
  ]

  return (
    <div className={styles.sort_plans}>
      <div className={styles.menu_sort}>
        <span className={styles.title}>вид спорта:</span>
        <ul className={styles.items}>
          {sports.map((sport) => (
            <li
              key={sport.id}
              className={
                activeSport === sport.id
                  ? styles.item_active
                  : styles.item
              }
              onClick={() => onSelectSport(sport.id)}
            >
              <div className={styles.icon}>{sport.icon}</div>
              <span className={styles.text}>{sport.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuSport
