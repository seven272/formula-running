import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { FaPencilAlt } from 'react-icons/fa'
import styles from './EditHeader.module.css'

const EditHeader = () => {
  const routerNavigate = useRouteNavigator()
  return (
    <div className={styles.main_edit_header}>
      <div
        className={styles.btn_back}
        onClick={() => routerNavigate.back()}
      >
        <BsBoxArrowInLeft
          size={20}
          className={styles.btn_back_icon}
        />
        <span className={styles.btn_back_text}>к списку планов</span>
      </div>
      {/* <span className={styles.title}>Редактор плана</span> */}
      <span className={styles.text}>
        Вы можете внести изменения и отредактировать любую тренировку
        в плане нажав на иконку <FaPencilAlt size={12}  className={styles.icon}/>
      </span>
    </div>
  )
}

export default EditHeader
