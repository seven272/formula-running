import React, { useMemo } from 'react'
import styles from './Pagination.module.css'

const Pagination = ({
  elementsPerPage = 1,
  totalElements = 5,
  paginate,
  activePage,
}) => {
  // из пропсов получаем какое количество данных выводить на одной странице elementsPerPage, а также общее количество данных totalElements и дальше циклом for определяем кол-во страниц для отображения (число эл-ов в массиве numberPages)
  const arrayPages = useMemo(() => {
    const numberPages = []
    for (
      let i = 1;
      i <= Math.ceil(totalElements / elementsPerPage);
      i++
    ) {
      numberPages.push(i) 
    }
    return numberPages 
  }, [totalElements, elementsPerPage])
  return (
    <ul className={styles.pagination}>
      {arrayPages.map((number) => (
        <li
          key={number}
          className={
            number === activePage + 1
              ? `${styles.item} ${styles.active}`
              : styles.item
          }
          onClick={() => paginate(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  )
}

export default Pagination