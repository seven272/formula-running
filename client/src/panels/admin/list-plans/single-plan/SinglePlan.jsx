import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaRegEdit, FaRegEye } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { TbDownload, TbDownloadOff } from 'react-icons/tb'

import styles from './SinglePlan.module.css'
import { fetchDeletePlan } from '../../../../redux/slices/plansSlice'
import ShowPlanAdmin from '../../show-plan-admin/ShowPlanAdmin'
import UpdatePlanAdmin from '../../update-plan-admin/UpdatePlanAdmin'

const SinglePlan = ({ plan }) => {
  const { _id, title, planUrl } = plan
  const dispatch = useDispatch()
  const [showPlan, setShowPlan] = useState(false)
  const [showUpdatePlan, setShowUpdatePlan] = useState(false)

  const handleDeletePlan = () => {
    dispatch(fetchDeletePlan(_id))
  }

  const handleShowPlan = () => {
    setShowPlan(true)
    setShowUpdatePlan(false)
  }

  const handleUpdatePlan = () => {
    setShowUpdatePlan(true)
    setShowPlan(false)
  }

  const handleDownloadPlan = () => {
    const path = ` http://localhost:5000${planUrl}`
    const link = document.createElement('a')
    link.href = path
    link.setAttribute('target', `_blank`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={styles.main}>
      <div className={styles.wpap_content}>
        <span className={styles.text}>{title}</span>
        <div className={styles.wrap_btns}>
          <span className={styles.btn} onClick={handleShowPlan}>
            <FaRegEye className={styles.icon} />
          </span>
          <span className={styles.btn} onClick={handleUpdatePlan}>
            <FaRegEdit className={styles.icon} />
          </span>
          <span className={styles.btn}>
            {planUrl !== '' ? (
              <TbDownload
                className={styles.icon}
                onClick={handleDownloadPlan}
              />
            ) : (
              <TbDownloadOff className={styles.icon} />
            )}
          </span>
          <span className={styles.btn} onClick={handleDeletePlan}>
            <RiDeleteBin2Line className={styles.icon} />
          </span>
        </div>
      </div>
      {showPlan && (
        <ShowPlanAdmin
          plan={plan}
          closeFn={() => setShowPlan(false)}
        />
      )}
      {showUpdatePlan && (
        <UpdatePlanAdmin
          plan={plan}
          closeFn={() => setShowUpdatePlan(false)}
        />
      )}
    </div>
  )
}

export default SinglePlan
