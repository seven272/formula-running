import { useState } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { TbNotes } from 'react-icons/tb'
import {
  MdOutlinePlayArrow,
  MdOutlinePlayDisabled,
} from 'react-icons/md'
import { FaQuestion } from 'react-icons/fa'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './CurrentPlan.module.css'
import Modal from '../../../UI/modal/Modal'
import ActivityCalendar from '../../../components/activity-calendar/ActivityCalendar'

const CurrentPlan = () => {
  const routerNavigator = useRouteNavigator()
  const { plan, activityDates } = useSelector(
    (state) => state.currentPlan,
  )
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={styles.main}>
      <span className={styles.title}>Активный план</span>
      <div className={styles.content_wrap}>
        {plan ? (
          <div className={styles.content}>
            <span className={styles.subtitle}>
              {plan.title}
              <TbNotes
                size={15}
                className={styles.icon}
                onClick={() => setShowModal(true)}
              />
            </span>
            <button
              className={styles.btn}
              onClick={() => routerNavigator.go('/plan')}
            >
              <span>заниматься</span>
              <MdOutlinePlayArrow size={20} />
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <span className={styles.subtitle_disable}>
              <FaQuestion size={20} />
            </span>
            <button className={styles.btn_disabled}>
              <span>ожидаю план...</span>
              <MdOutlinePlayDisabled size={20} />
            </button>
          </div>
        )}

        <ActivityCalendar activityDates={activityDates} />

        <span className={styles.descr}>
          Назначить или изменить активный план можно нажав на иконку
          {<BsCheckCircle size={10} className={styles.icon_descr} />}
          напротив названия в списке купленных или созданных планов
        </span>
      </div>
      {plan && (
        <Modal active={showModal} setActive={setShowModal}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: 'auto',
              background: 'none',
            }}
          >
            <span
              style={{
                font: 'var(--font-menu)',
                marginBottom: '10px',
              }}
            >
              {plan?.title}
            </span>
            <span
              style={{
                font: 'var(--font-s)',
                marginBottom: '5px',
                textAlign: 'center',
              }}
            >
              дистанция: {plan.distance}
            </span>
            <span
              style={{
                font: 'var(--font-s)',
                marginBottom: '5px',
                textAlign: 'center',
              }}
            >
              тренировачных недель: {plan.period}
            </span>
            {plan.subtitle !== '' && (
              <span
                style={{
                  font: 'var(--font-s)',
                  textAlign: 'left',
                }}
              >
                {plan.subtitle}
              </span>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CurrentPlan
