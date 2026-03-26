import { useState,  } from 'react'
import {  useDispatch } from 'react-redux'
import { CiSaveDown1 } from 'react-icons/ci'

import styles from './AvatarForm.module.css'
import { fetchAvatarUser } from '../../../../redux/slices/userSlice'
import axios from '../../../../utils/axios.js'

const AvatarForm = ({ closeForm }) => {
  const dispatch = useDispatch()
  const [fileData, setFileData] = useState('')

  const getFile = (e) => {
    setFileData(e.target.files[0])
    console.log(e.target.files[0])
  }


  const uploadAvatar = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', fileData)
      const { data } = await axios.post('/user/upload/avatar', formData)
      const avatarUrl = data.url
      dispatch(fetchAvatarUser(avatarUrl))
      closeForm(false)
    } catch (error) {
      console.warn(error)
      alert('Ошибка при загрузке изображения')
    }
  }
  return (
    <div className={styles.form}>
      <form
        action="/upload"
        method="POST"
        encType="multipart/form-data"
        className={styles.input_field}
        onSubmit={(evt) => evt.preventDefault()}
      >
        <input
          type="file"
          name="avatar"
          required
          className={styles.input_field_text}
          onChange={getFile}
        />
      </form>
      <button className={styles.btn_save} onClick={uploadAvatar}>
        <CiSaveDown1 className={styles.icon_save} />
        Сохранить и закрыть
      </button>
    </div>
  )
}

export default AvatarForm
