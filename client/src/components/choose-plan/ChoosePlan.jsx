import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaListOl } from 'react-icons/fa'

import styles from './ChoosePlan.module.css'
import { changeActivePlan } from '../../redux/slices/planSlice'

const ChoosePlan = () => {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.plans.favoritePlans)



  const handleChoosePlan = (evt) => {
    const id = evt.target.value
    let result = list.find((elem) => elem.id === id)
    dispatch(changeActivePlan(result))
  }

  return (
    <div className={styles.choose_plan}>
      <div className={styles.wrapper}>
        <FaListOl className={styles.icon} />
        <select
          className={styles.select_form}
          name="choose-plan"
          defaultValue='DEFAULT'
          onChange={handleChoosePlan}
        >
          <option
            className={styles.option_form}
            value="DEFAULT"
            disabled
          >
            Список избранных планов
          </option>

          {list.map((item) => {
            return (
              <option
                className={styles.option_form}
                key={item.id}
                value={item.id}
              >
                {item.title}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default ChoosePlan
