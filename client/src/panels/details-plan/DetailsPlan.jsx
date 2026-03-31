import { useState, useEffect } from 'react'
import {
  useParams,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { IoCartOutline } from 'react-icons/io5'
import { TbCurrencyDollarOff } from 'react-icons/tb'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Panel } from '@vkontakte/vkui'

import styles from './DetailsPlan.module.css'
import { fetchBuyPlan } from '../../redux/slices/plansSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useVkPay } from '../../utils/useVkPay'

const DetailsPlan = ({ id }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const currentId = params.id
  const routerNavigate = useRouteNavigator()
  const { allPlans, purchasedPlans } = useSelector(
    (state) => state.plans,
  )
  const { payVirtualMoney } = useVkPay()
  const [plan, setPlan] = useState(() => {})
  const [training, setTraining] = useState(() => {})
  const [isPurchased, setIsPurchased] = useState(false)

  const findPlan = () => {
    // находим нужный план сравнивая ид элемента и данные их хука useParams
    const currentPlan = allPlans.find((elem) => {
      return elem._id === currentId
    })

    const workouts =
      typeof currentPlan.workouts === 'string'
        ? JSON.parse(currentPlan.workouts)
        : currentPlan.workouts

    setPlan(currentPlan)
    setTraining(workouts[0].sessions)
  }

  const buyPlan = () => {
    payVirtualMoney('ready', currentId)
    setIsPurchased((prev) => !prev)
  }

  const buyFreePlan = () => {
    dispatch(fetchBuyPlan(currentId))
    setIsPurchased((prev) => !prev)
  }

  // const downloadPdf = async () => {
  //   try {
  //     const res = await axios.get(`/plans/download/${currentId}`, {
  //       responseType: 'blob', //дополнительно указываю тип ответа
  //     })

  //     // создаю URL blob для PDF файла. URL.createObjectURL — метод в JavaScript, который создаёт уникальный URL для объекта Blob
  //     const url = window.URL.createObjectURL(new Blob([res.data]))
  //     console.log(url)
  //     // создаю ссылку
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.setAttribute('download', `${plan.title}.pdf`) // устанавливаю значение у атрибута download

  //     // добавляю ссылку в тело документа
  //     document.body.appendChild(link)

  //     // начинаю загрузку
  //     link.click()

  //     // Ощищаю и удаляю ссылку
  //     link.remove()
  //     window.URL.revokeObjectURL(url)
  //   } catch (error) {
  //     console.error('Error downloading the PDF: ', error)
  //     dispatch(
  //       showToast({
  //         message: 'Ошибка при скачивании плана',
  //         type: 'error',
  //       }),
  //     )
  //   }
  // }

  const checkPurchased = () => {
    const arrId = purchasedPlans.map((elem) => {
      return elem.originalPlanId
    })
    const value = arrId.includes(currentId)

    setIsPurchased(value)
  }

  useEffect(() => {
    findPlan()
    checkPurchased()
  }, [])

  return (
    <Panel id={id}>
      <Header />
      <div className={styles.details}>
        <div className={styles.wrapper}>
          <div
            className={styles.back}
            onClick={() => routerNavigate.back()}
          >
            <BsBoxArrowInLeft
              size={20}
              className={styles.back__icon}
            />
            <span className={styles.back__text}>к списку планов</span>
          </div>
          {plan && (
            <>
              <h2 className={styles.details__title}>{plan.title}</h2>
              <span className={styles.details__period}>
                Срок подготовки: {plan.period}
              </span>
              <span className={styles.details__description}>
                {plan.subtitle}
              </span>
              <h3 className={styles.details__subtitle}>
                Пример первой тренировочной недели
              </h3>
              <div className={styles.plan__header}>
                <span className={styles.plan__header_number}>№</span>
                <span className={styles.plan__header_day}>День</span>
                <span className={styles.plan__header_title}>
                  Тренировка
                </span>
                <span className={styles.plan__header_descr}>
                  Описание
                </span>
              </div>
              <ul className={styles.plan__days}>
                {training &&
                  training.map((elem) => {
                    return (
                      <li key={elem.id} className={styles.plan__day}>
                        <span className={styles.plan__day_number}>
                          {elem.id}
                        </span>
                        <span className={styles.plan__day_day}>
                          {elem.day}
                        </span>
                        <span className={styles.plan__day_title}>
                          {elem.title}
                        </span>
                        <span className={styles.plan__day_descr}>
                          {elem.descr}
                        </span>
                      </li>
                    )
                  })}
                <li></li>
              </ul>
            </>
          )}

          {!isPurchased && !plan?.isFree && (
            <div className={styles.pdf_block}>
              <span className={styles.pdf_text2}>
                Скачать план в формате
              </span>
              <FaRegFilePdf size={20} className={styles.pdf_icon2} />
              <span className={styles.pdf_text2}>
                можно после покупки
              </span>
            </div>
          )}

          <div className={styles.btn_wrap}>
            {plan?.isFree ? (
              <button
                className={styles.card_btn_free}
                disabled={isPurchased}
                onClick={buyFreePlan}
              >
                заниматься бесплатно
                <TbCurrencyDollarOff className={styles.btn_icon} />
              </button>
            ) : (
              <button
                className={styles.card_btn}
                disabled={isPurchased}
                onClick={buyPlan}
              >
                купить
                <IoCartOutline className={styles.btn_icon} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default DetailsPlan
