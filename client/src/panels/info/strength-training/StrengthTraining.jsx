import { BsBoxArrowInLeft } from 'react-icons/bs'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './StrengthTraining.module.css'

const StrengthTraining = () => {
  const routeNavigator = useRouteNavigator()
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        <button
          className={styles.btn_back}
          onClick={() => routeNavigator.back()}
        >
          <BsBoxArrowInLeft className={styles.btn_icon} />
          назад
        </button>
        <h1 className={styles.title}>Силовые упражнения</h1>
        <span className={styles.descr}>
          Для бегунов силовые тренировки являются критически важными
          для профилактики травм, повышения экономичности бега и
          развития мощности. Оптимально заниматься силовыми
          упражнениями 1–2 раза в неделю по 30–60 минут. Ниже
          приведены основные варианты и комплексы упражнений:
        </span>
        <h3 className={styles.subtitle}>
          Базовый комплекс ОФП (с собственным весом)
        </h3>
        <span className={styles.descr}>
          <p>
            - Выпады: классические, назад или боковые. Укрепляют
            квадрицепсы и ягодицы.
          </p>
          <p>
            - Приседания: помогают развить общую силу ног. Вариант для
            продвинутых — приседания на одной ноге.
          </p>
          <p>
            - Ягодичный мостик: одно из лучших упражнений для
            активации задней цепи, что важно для мощного отталкивания.
          </p>
          <p>
            - Планка (классическая и боковая): укрепляет мышцы кора,
            помогая удерживать ровную осанку при усталости.
          </p>
          <p>
            - Зашагивания на платформу: имитируют беговое движение и
            развивают силу бедра.
          </p>
        </span>
        <span className={styles.subdescr}>
          3-4 подхода, от 10 до 20 повторений в одном подходе, отдых
          30–60 секунд между подходами
        </span>
        <h3 className={styles.subtitle}>
          Тренировки в тренажерном зале
        </h3>
        <span className={styles.descr}>
          Позволяют работать с дополнительным весом для максимального
          развития силы.
          <p>
            - Становая тяга (или румынская тяга): для укрепления
            задней поверхности бедра и спины
          </p>
          <p>
            - Подъемы на носки: необходимы для силы икроножных мышц и
            защиты от травм голени.
          </p>
          <p>
            - Жим гантелей / Отжимания: сильные руки и плечевой пояс
            помогают поддерживать ритм бега
          </p>
        </span>
        <span className={styles.subdescr}>
          2-3 подхода,  8 - 12 повторений в одном подходе, отдых
          2-3 минуты между подходами
        </span>
      </div>
    </div>
  )
}

export default StrengthTraining
