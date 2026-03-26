import React, { useState } from 'react'


import styles from './PulseForm.module.css'
import ChooseTypeCount from './choose-type-count/ChooseTypeCount'
import PulseAuto from './pulse-auto/PulseAuto'
import PulseHandle from './pulse-handle/PulseHandle'

const PulseForm = ({ showForm }) => {
  const [typeCount, setTypeCount] = useState('')
  const [showTypeCount, setShowTypeCount] = useState(true)

  const chooseHowCount = (payload) => {
    switch (payload) {
      case 'auto':
        setTypeCount('auto')
        setShowTypeCount(false)
        break
      case 'handle':
        setTypeCount('handle')
        setShowTypeCount(false)
        break
      default:
        setTypeCount('')
        setShowTypeCount(true)
    }
  }

  return (
    <div className={styles.form}>
      {showTypeCount && (
        <ChooseTypeCount
          howCount={chooseHowCount}
          show={setShowTypeCount}
          showForm={showForm}
        />
      )}

      {typeCount === 'auto' && <PulseAuto showForm={showForm} />}
      {typeCount === 'handle' && <PulseHandle showForm={showForm} />}
    </div>
  )
}

export default PulseForm
