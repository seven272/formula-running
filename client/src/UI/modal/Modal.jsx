import React, { useEffect } from 'react'
import styles from './Modal.module.css' 

const Modal = ({ active, setActive, children }) => {
  // закрываем модальное окно при нажатии на ESC 
  useEffect(() => {
    const closeModal = (evt) => {
      if (evt.key === 'Escape') { 
        setActive(false)
      }
    }
    window.addEventListener('keydown', closeModal)
    return () => window.removeEventListener('keydown', closeModal)
  }, [])
 
  return ( 
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : styles.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modal__content} ${styles.active}`
            : styles.modal__content
        }
        onClick={(evt) => evt.stopPropagation()}
      >
        {children} 
        <span
          className={styles.close}
          onClick={() => setActive(false)}
        >
          &times;
        </span>
      </div>
    </div>
  )
}

export default Modal
