import { useSelector } from 'react-redux'
import { MdOutlineAddAPhoto } from 'react-icons/md'

import styles from './Avatar.module.css'


const Avatar = () => {
  const { avatar } = useSelector((state) => state.user)


  return (
    <div className={styles.avatar}>
      <div className={styles.wrapper}>
        <div className={styles.avatar_block}>
          {avatar === '' || typeof avatar === 'undefined' ? (
            <MdOutlineAddAPhoto
              size={34}
              className={styles.add_photo_icon}
            />
          ) : (
            <img
              className={styles.image}
              src={avatar}
              alt="аватар пользователя"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Avatar
