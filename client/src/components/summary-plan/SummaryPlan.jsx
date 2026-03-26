import { useState } from 'react'
import { BsArrowsCollapse } from 'react-icons/bs'
import { TbStretching2, TbStretching } from 'react-icons/tb'
import { RiSlowDownLine } from 'react-icons/ri'
import { BsSignStopFill } from 'react-icons/bs'
import { FaChartLine } from 'react-icons/fa'
import { FaHeartPulse } from 'react-icons/fa6'

import styles from './SummaryPlan.module.css'

const SummaryPlan = () => {
  const [showSummary, setShowSummary] = useState(true)

  const handleCollapse = () => {
    console.log(showSummary)
    setShowSummary((prev) => !prev)
  }

  return (
    <div className={styles.main_summary}>
      <span className={styles.main_title}>
        <p>Руководство к твоим тренировкам</p>
        <BsArrowsCollapse className={styles.main_icon}  onClick={handleCollapse}/>
      </span>
      <span className={styles.main_descr}>
        Этот план — не просто список пробежек, а система, которая
        поможет тебе стать сильнее и выносливее без вреда для
        здоровья. Чтобы прогресс был стабильным, внимательно изучи эти
        базовые принципы.
      </span>

      {showSummary && (
        <div className={styles.bloks_wrap}>
          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <TbStretching
                className={styles.icon}
               
              />
              Разминка и заминка
            </h3>
            <span className={styles.descr}>
              Никогда не начинай интенсивную работу «на холодную».
              <p>
                <strong>Разминка:</strong> Перед основной тренировкой
                выполни 10–15 минут легкого бега (трусцы) и серию
                динамических упражнений (вращения суставов, махи). Это
                подготовит сердце и разогреет мышцы, защищая тебя от
                травм.
              </p>
              <p>
                <strong>Заминка:</strong> После тренировки не
                останавливайся резко. Перейди на спокойный шаг или
                очень медленный бег на 5–10 минут, чтобы плавно
                снизить пульс.
              </p>
            </span>
          </div>

          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <TbStretching2 className={styles.icon} />
              Растяжка
            </h3>
            <span className={styles.descr}>
              Мышцы после бега склонны «забиваться» и укорачиваться.
              Уделяй 10 минут статической растяжке после завершения
              тренировки. Особое внимание — икроножным мышцам,
              передней и задней поверхности бедра. Это ускорит
              восстановление и сохранит легкость в ногах.
            </span>
          </div>

          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <BsSignStopFill className={styles.icon} />
              Отдых и восстановление
            </h3>
            <span className={styles.descr}>
              Твой организм становится сильнее не во время бега, а во
              время отдыха. Дни покоя — обязательная часть плана. Сон
              не менее 7–8 часов и сбалансированное питание позволят
              тебе выйти на следующую тренировку полным сил, а не
              истощенным.
            </span>
          </div>
          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <RiSlowDownLine className={styles.icon} />
              Темп и интенсивность
            </h3>
            <span className={styles.descr}>
              Соблюдай целевой темп, указанный в плане.
              <p>
                <strong>Легкие пробежки</strong> должны проходить в
                «разговорном» темпе (ты можешь связно произнести
                предложение, не задыхаясь).
              </p>
              <p>
                <strong>Интенсивные тренировки</strong> (интервалы,
                темповый бег) требуют усилий, но не должны выполняться
                на 100% твоих возможностей, если этого не требует
                план.
              </p>
            </span>
          </div>
          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <FaChartLine className={styles.icon} />
              Объем тренировок
            </h3>
            <span className={styles.descr}>
              Беговой объем (количество километров в неделю)
              увеличивается постепенно. Не пытайся догнать план, если
              пропустил тренировку — просто продолжай со следующего
              дня. Помни: стабильность важнее разового рекорда.
            </span>
          </div>

          <div className={styles.text_block}>
            <h3 className={styles.title}>
              <FaHeartPulse className={styles.icon} />
              Пульс
            </h3>
            <span className={styles.descr}>
              Используй спортивные часы или нагрудный датчик для
              отслеживания пульса. Если у тебя нет пульсометра,
              ориентируйся по дыханию. Во 2-й зоне ты можешь говорить
              полными предложениями, в 3-й — короткими фразами, в 4-й
              — только отдельными словами.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SummaryPlan
