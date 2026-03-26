import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RiImageAddFill } from 'react-icons/ri'
import { GrDocumentPdf } from 'react-icons/gr'
import { FaUpload } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import axios from '../../../utils/axios.js'
import styles from './CreatePlan.module.css'
import { fetchCreatePlan } from '../../../redux/slices/plansSlice'
import usePreviewImg from '../../../utils/usePreviewImg.js'
import useCalculatePace from '../../../utils/useCalculatePace.js'

const CreatePlan = ({ closeFn }) => {
  const dispatch = useDispatch()
  const imgRef = useRef()
  const planRef = useRef()
  const { handleImageChange, imgUrl } = usePreviewImg()
  const [newPlan, setNewPlan] = useState({
    title: '',
    subtitle: '',
    typeSport: '',
    distance: '',
    time: { h: '', m: '', s: '' },
    pace: '',
    period: '',
    planUrl: '',
    pictureUrl: '',
    isFree: false,
    workouts: [],
  })

  const { countRunPaceFormula } = useCalculatePace()

  const handleChange = (evt) => {
    let { name, value } = evt.target

    if (name === 'isFreeTrue' || name === 'isFreeFalse') {
      if (value === 'true') {
        value = true
        name = 'isFree'
      }
      if (value === 'false') {
        value = false
        name = 'isFree'
      }
    }
    setNewPlan((prevState) => ({ ...prevState, [name]: value }))
  }

  const uploadPicture = async (evt) => {
    const file = evt.target.files[0]
    handleImageChange(evt)

    try {
      const formData = new FormData()
      formData.append('picture', file)
      const { data } = await axios.post(
        '/plans/upload/picture',
        formData,
      )
      const pictureUrl = data.url
      setNewPlan((prevState) => ({
        ...prevState,
        pictureUrl: pictureUrl,
      }))
    } catch (error) {
      console.warn(error)
      alert('Ошибка при загрузке изображения')
    }
  }

  const uploadPlanPdf = async (evt) => {
    const file = evt.target.files[0]
    try {
      const formData = new FormData()
      formData.append('plan', file)
      const { data } = await axios.post(
        '/plans/upload/plan',
        formData,
      )
      const planUrl = data.url
      setNewPlan((prevState) => ({
        ...prevState,
        planUrl: planUrl,
      }))
    } catch (error) {
      console.warn(error)
      alert('Ошибка при загрузке плана в Pdf ')
    }
  }

  const handleTime = (evt) => {
    evt.target.value = evt.target.value
      .replace(/[^\d.]/g, '')
      .substr(0, 2)

    let name = evt.target.name
    let value = Number(evt.target.value)
    if (name === 'h' && value > 6) {
      value = 6
    } else if ((name === 'm' || name === 's') && value > 59) {
      value = 59
    }
    setNewPlan((prev) => ({
      ...prev,
      time: {
        ...prev.time,
        [name]: value,
      },
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const multDistance = {
      '5км': 5000,
      '10км': 10000,
      '21км': 21097,
      '42км': 42195,
    }

    const sumTime =
      Number(newPlan.time.h * 3600) +
      Number(newPlan.time.m * 60) +
      Number(newPlan.time.s)

    const pacePlan = countRunPaceFormula(
      multDistance[newPlan.distance],
      sumTime,
    )

    // Создаем актуальную копию данных прямо здесь
    const updatedPlan = {
      ...newPlan,
      pace: { ...pacePlan },
    }

    // 1. Обновляем локальный стейт (для UI)
    setNewPlan(updatedPlan)

    // 2. Отправляем в Redux готовую копию
    dispatch(fetchCreatePlan(updatedPlan))

    closeFn('')
  }
  return (
    <div className={styles.section}>
      <span className={styles.title}>
        Создать план <MdClose size={20} onClick={() => closeFn('')} />
      </span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="titleId" className={styles.label}>
          <span className={styles.label_title}>Название:</span>
          <input
            className={styles.input_text}
            type="text"
            id="titleId"
            name="title"
            placeholder="Название плана"
            required
            value={newPlan.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="subtitleId" className={styles.label}>
          <span className={styles.label_title}>Описание:</span>
          <textarea
            className={styles.input_textarea}
            type="textarea"
            id="subtitleId"
            name="subtitle"
            placeholder="Описание плана"
            rows={4}
            cols={40}
            required
            value={newPlan.subtitle}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="typesportId" className={styles.label}>
          <span className={styles.label_title}>Вид спорта:</span>
          <select
            className={styles.input_select}
            id="typesportId"
            name="typeSport"
            value={newPlan.typeSport}
            onChange={handleChange}
          >
            <option value="" disabled>
              --выбрать--
            </option>
            <option value="run">Бег</option>
            <option value="bike">Велосипед</option>
            <option value="swim">Плавание</option>
            <option value="tri">Триатлон</option>
          </select>
        </label>

        <label htmlFor="distanceId" className={styles.label}>
          <span className={styles.label_title}>
            {' '}
            Дистанция <small>(5км,10км,21км, 42км)</small>:
          </span>
          <input
            className={styles.input_text}
            type="text"
            id="distanceId"
            name="distance"
            placeholder="Планируемая дистанция"
            required
            value={newPlan.distance}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="periodId" className={styles.label}>
          <span className={styles.label_title}>
            Длительность плана <small>(просто цифра 4, 8...)</small> :
          </span>
          <input
            className={styles.input_text}
            type="text"
            id="periodId"
            name="period"
            placeholder="Длительность плана"
            required
            value={newPlan.period}
            onChange={handleChange}
          />
        </label>

        <div className={styles.time_inputs_wrap}>
          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>часы</span>
            <input
              type="text"
              name="h"
              value={newPlan.time.h}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 6"
            />
          </label>

          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>минуты</span>
            <input
              type="text"
              name="m"
              value={newPlan.time.m}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 59"
            />
          </label>

          <label className={styles.time_input_label}>
            <span className={styles.time_input_text}>секунды</span>
            <input
              type="text"
              name="s"
              value={newPlan.time.s}
              className={styles.time_input_field}
              onChange={handleTime}
              placeholder="от 0 до 59"
            />
          </label>
        </div>

        <label htmlFor="pictureUrlId" className={styles.label}>
          <span className={styles.label_title}>
            Загрузить изображение:
          </span>
          <span
            className={styles.upload_icon_wrap}
            onClick={() => imgRef.current.click()}
          >
            <RiImageAddFill className={styles.upload_icon} />
          </span>
          {imgUrl && <img src={imgUrl} className={styles.image} />}

          <input
            className={styles.input_file}
            type="file"
            id="pictureUrlId"
            name="pictureUrl"
            multiple
            ref={imgRef}
            onChange={uploadPicture}
            hidden
          />
        </label>

        <label htmlFor="planUrlId" className={styles.label}>
          <span className={styles.label_title}>
            Загрузить PDF плана:
          </span>
          <span
            className={styles.upload_icon_wrap}
            onClick={() => planRef.current.click()}
          >
            <FaUpload className={styles.upload_icon} />
          </span>
          {newPlan.planUrl !== '' && (
            <div className={styles.planurl_wrap}>
              <span className={styles.planurl_icon_wrap}>
                <GrDocumentPdf
                  size={15}
                  className={styles.planurl_icon}
                />
              </span>
              <span className={styles.planurl_text}>
                план успешно загружен
              </span>
            </div>
          )}

          <input
            className={styles.input_file}
            type="file"
            id="planUrlId"
            name="planUrl"
            multiple
            ref={planRef}
            onChange={uploadPlanPdf}
            hidden
          />
        </label>

        <label className={styles.label}>
          <span className={styles.label_title}>
            Платный или беспалтный:
          </span>
          <div className={styles.wrap_btn_radio}>
            <input
              className={styles.input_radio}
              type="radio"
              id="radio1"
              name="isFreeTrue"
              value={'true'}
              checked={newPlan.isFree === true}
              onChange={handleChange}
            />
            <span className={styles.text_radio}>беспалтный</span>
            <input
              className={`${styles.input_radio_right} `}
              type="radio"
              id="radio2"
              name="isFreeFalse"
              value={'false'}
              checked={newPlan.isFree === false}
              onChange={handleChange}
            />
            <span className={styles.text_radio}>платный</span>
          </div>
        </label>

        <label htmlFor="workoutsId" className={styles.label}>
          <span className={styles.label_title}>
            Содержание плана:
          </span>
          <textarea
            className={styles.input_textarea}
            id="workoutsId"
            name="workouts"
            placeholder="написать сам план тренировок"
            rows={8}
            cols={40}
            required
            value={newPlan.workouts}
            onChange={handleChange}
          />
        </label>

        <div className={styles.btn_wrap}>
          <button className={styles.btn}>создать</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePlan
