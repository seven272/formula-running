import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { TbMoodSmile } from 'react-icons/tb'

import styles from './ModalRating.module.css'


const ModalRating = ({ getData }) => {
  const [valueRating, setValueRating] = useState(null)
  const [valueMood, setValueMood] = useState(null)
  const [openModal, setOpenModal] = useState(false)


  const dictionaryRating = [
    { title: '2', value: 2 },
    { title: '3', value: 3 },
    { title: '4-', value: 3.5 },
    { title: '4', value: 4 },
    { title: '4+', value: 4.5 },
    { title: '5', value: 5 },
  ]

  const dictionaryMood = [
    { title: '😞', value: 1 },
    { title: '😐', value: 3 },
    { title: '🙂', value: 5 },
  ]
  const showModal = () => {
    setOpenModal(true)
  }

  const handleOk = () => {
    getData({
      rating: valueRating,
      mood: valueMood,
    })
    setValueRating(null)
    setValueMood(null)
    setOpenModal(false)
  }

  const handleCancel = () => {
    setValueRating(null)
    setValueMood(null)
    setOpenModal(false)
  }

 
  return (
    <>
      <TbMoodSmile
        size={40}
        className={styles.icon}
        onClick={showModal}
      />
      <Modal
        open={openModal}
        title="Оцените тренировку..."
        okText="Оценить"
        cancelText="Отменить"
        onOk={handleOk}
        onCancel={handleCancel}
        //     footer={() => (
        //       <>
        //         <button
        //           className={styles.btn_cancel}
        //           onClick={handleCancel}
        //           disabled={false}
        //         >
        //           Отменить
        //         </button>

        //         <button
        //           className={styles.btn_ok}
        //           onClick={handleOk}
        //           disabled={false}
        //         >
        //           Установить
        //         </button>
        //       </>
        //     )}
      >
        <div className={styles.form}>
          <div className={styles.rating_wrapper}>
            <span className={styles.rating_title}>
              Как оцениваете выполнение тренировки?
            </span>
            <ul className={styles.rating_btns}>
              {dictionaryRating.map((elem) => {
                return (
                  <li
                    key={elem.value}
                    className={styles.rating_btn}
                    onClick={() => setValueRating(elem.value)}
                  >
                    {elem.title}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.mood_wrapper}>
            <span className={styles.mood_title}>
              Оцените свое самочувствие?
            </span>
            <ul className={styles.mood_btns}>
              {dictionaryMood.map((elem) => {
                return (
                  <li
                    key={elem.value}
                    className={styles.mood_btn}
                    onClick={() => setValueMood(elem.value)}
                  >
                    {elem.title}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalRating
