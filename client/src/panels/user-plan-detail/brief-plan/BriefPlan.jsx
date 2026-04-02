import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import { FaRegFilePdf } from 'react-icons/fa6'

import GeneratePdfButton from '../../../components/convert-pdf/pdf-generate-plan/GeneratePdfButton'
import ReadyPdfButton from '../../../components/convert-pdf/pdf-ready-plan/ReadyPdfButton'
import styles from './BriefPlan.module.css'

const BriefPlan = ({ plan, typePlan }) => {
  const routerNavigate = useRouteNavigator()
  const dictonaryDist = {
    '5км': '5 километров',
    '10км': '10 километров',
    '21км': 'полумарафон',
    '42км': 'марафон',
  }
  return (
    <div className={styles.main_brief}>
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
      <div className={styles.content}>
        <span className={styles.text}>
          <strong>Название:</strong> <span>{plan.title}</span>
        </span>

        <span className={styles.text}>
          <strong>Дистанция:</strong>
          <span>
            {typePlan === 'generate'
              ? plan.distance
              : dictonaryDist[plan.distance]}
          </span>
        </span>
        <span className={styles.text}>
          <strong>Длительность, недели:</strong> <span>{plan.period}</span>
        </span>

        {typePlan === 'paid' && (
          <span className={styles.text}>
            <strong>Описание:</strong> <span>{plan.subtitle}</span>
          </span>
        )}
        {typePlan === 'paid' && plan?.isFree ? (
          <span className={styles.text}>
            <span className={styles.pdf_text2}>
              Бесплатный план в формате
            </span>
            <FaRegFilePdf size={20} className={styles.pdf_icon2} />
            <span className={styles.pdf_text2}>недоступен</span>
          </span>
        ) : (
          <span className={styles.text}>
            {typePlan === 'generate' ? (
              <GeneratePdfButton
                planWeeks={plan.workouts}
                pacePlan={plan.pace}
                titlePlan={plan.title}
              />
            ) : (
              <ReadyPdfButton
                planWeeks={plan.workouts}
                pacePlan={plan.pace}
                titlePlan={plan.title}
              />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default BriefPlan
