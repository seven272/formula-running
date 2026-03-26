import { useDispatch } from 'react-redux'

// База упражнений с километражом и индексом нагрузки (1-5)
import workoutPool from '../assets/plans/training/workoutPool'
import useCalculatePace from './useCalculatePace'
import {
  setCustomPlan,
  fetchCreateCustomPlan,
} from '../redux/slices/customPlanSlice'

const useCreatePlan = () => {
  const dispatch = useDispatch()
  const { countRunPaceFormula } = useCalculatePace()

  // Оценка уровня усталости по сумме баллов нагрузки за неделю
  const getLoadStatus = (totalLoad) => {
    if (totalLoad <= 8) return '🟢 легкая (восстановление)'
    if (totalLoad <= 12) return '🟡 средняя (поддержание)'
    if (totalLoad <= 17) return '🟠 высокая (развитие)'
    return '🔴 пиковая (стресс)'
  }

  const multipliers = {
    level: { beginner: 0.8, intermediate: 1.0, advanced: 1.2 },
    distance: { '10km': 0.7, '21km': 1.0, '42km': 1.4 },
    meters: { '10km': 10000, '21km': 21097, '42km': 42195 },
    names: {
      '10km': '10 километров',
      '21km': 'полумарафон',
      '42km': 'марафон',
    },
  }

  // Минимальные пороги для "длительной" (Long Run) в зависимости от цели
  const minLongRunLimits = {
    '10km': 8,
    '21km': 14,
    '42km': 22,
  }
  // Максимальные пороги для "длительной" (Long Run) в зависимости от цели
  const maxLongRunLimits = {
    '10km': 20,
    '21km': 22,
    '42km': 29,
  }

  // создаю название  плана
  const generateTitlePlan = (goal, totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const arrTime = []

    if (hours === 0) {
      arrTime.push('00')
    } else {
      arrTime.push(String(hours).padStart(2, '0'))
    }

    if (minutes === 0) {
      arrTime.push('00')
    } else {
      arrTime.push(String(minutes).padStart(2, '0'))
    }

    if (seconds === 0) {
      arrTime.push('00')
    } else {
      arrTime.push(String(seconds).padStart(2, '0'))
    }

    const strTime = arrTime.join(':')

    const title = `План ${multipliers.names[goal]} за ${strTime}`
    return title
  }

  const generateWorkoutDescription = (
    workout,
    levelCoef,
    distanceCoef,
    weekGrowth,
    recoveryDrop,
  ) => {
    // Коэффициенты объема (на сколько умножаем количество повторов или км)
    const multCoef =
      levelCoef * distanceCoef * weekGrowth * recoveryDrop
    // console.log('Итоговый коэффициент: ' + multCoef)
    //округляем дистанцию и кол-во повторов до 0.5
    const roundToHalf = (num) => Math.round(num * 2) / 2

    let calculatedKm = 0
    let arrDescr = []

    if (!workout.segments) {
      return {
        calculatedKm: workout.km,
        finalTextDescr: workout.descr,
      }
    }

    workout?.segments.map((seg) => {
      let segKm = 0
      let text = ''

      if (seg.type === 'warmup' || seg.type === 'cooldown') {
        segKm = roundToHalf(seg.dist * multCoef)
        text = `${seg.label} ${segKm} км в темпе Р1.`
      } else if (seg.type === 'rest') {
        segKm = seg.dist
        text = `Отдых ${segKm} км. Легкий бег трусцой, можно с переходом на шаг.`
      } else if (seg.type === 'easy') {
        segKm = roundToHalf(seg.dist * multCoef)
        text = ` Дистанция ${segKm} км в темпе P1.`
      } else if (seg.type === 'long') {
        segKm = roundToHalf(seg.dist * multCoef)
        text = `${seg.label}. Общая дистанция ${segKm} км.`
      } else if (seg.type === 'tempo') {
        if (seg.repeats) {
          // Масштабируем количество повторов
          const repeats = Math.max(
            1,
            Math.round(seg.repeats * multCoef),
          )
          segKm = roundToHalf(
            (seg.workDist + (seg.restDist || 0)) * repeats,
          )
          text = `${repeats} x ${seg.workDist}км через ${seg.restDist}км отдыха;`
        } else {
          segKm = roundToHalf(seg.dist * multCoef)
          text = `Основной блок ${segKm} км ${seg.label}`
        }
      } else if (seg.type === 'interval') {
        // Масштабируем количество повторов
        const repeats = Math.max(
          1,
          Math.round(seg.repeats * multCoef),
        )
        segKm = roundToHalf(
          (seg.workDist + (seg.restDist || 0)) * repeats,
        )
        text = `${repeats} x ${seg.workDist}км через ${seg.restDist}км отдыха ${seg.label}`
      }

      // console.log(text)
      arrDescr.push(text)
      calculatedKm += segKm
    })

    const finalTextSegments = arrDescr.join(' ')

    return {
      calculatedKm,
      finalTextSegments,
    }
  }

  // генератор беговок плана
  const generateRunningPlan = ({
    goal,
    time = 2400,
    totalWeeks,
    daysPerWeek,
    longDay = 'Вс',
    level = 'intermediate',
    hasStrengths,
    strengthDays = [],
  }) => {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    const structures = {
      3: [
        'rest',
        'intervals',
        'rest',
        'tempo',
        'rest',
        'rest',
        'long',
      ],
      4: [
        'rest',
        'intervals',
        'easy',
        'rest',
        'tempo',
        'rest',
        'long',
      ],
      5: [
        'rest',
        'intervals',
        'easy',
        'tempo',
        'rest',
        'easy',
        'long',
      ],
      6: [
        'easy',
        'intervals',
        'easy',
        'tempo',
        'easy',
        'rest',
        'long',
      ],
      7: [
        'easy',
        'intervals',
        'easy',
        'tempo',
        'easy',
        'easy',
        'long',
      ],
    }

    // 1. Валидация входных параметров,защита от дурака
    const weeks = Math.min(Math.max(totalWeeks, 4), 16) // от 4 до 16 недель
    const daysCount = Math.min(Math.max(daysPerWeek, 3), 7) // от 3 до 7 дней в неделю
    const targetGoal = multipliers.distance[goal] ? goal : '21km' // целевая дистанция
    const levelCoefficient = multipliers.level[level] //коэфициент уровня пользователя
    const longDayInx = dayNames.findIndex((elem) => elem === longDay) //индекс длительного дня

    //расчитываю темп бега к плану
    countRunPaceFormula(multipliers.meters[goal], time)

    // Ротация структуры (перенос Long Day)
    let structure = []
    let baseStructure = [...structures[daysCount]]
    if (longDayInx === 6) {
      structure = baseStructure
    } else {
      const withoutLong = baseStructure.filter((t) => t !== 'long')
      structure = [
        ...withoutLong.slice(0, longDayInx),
        'long',
        ...withoutLong.slice(longDayInx),
      ].slice(0, 7)
    }

    // Храним id тренировок предыдущей недели для исключения повторов
    let lastWeekId = {
      easy: [],
      intervals: [],
      tempo: [],
      long: [],
    }

    const plan = []

    for (let w = 1; w <= weeks; w++) {
      //каждая 4 неделя и последняя неделя плана восстановительная
      const isRecovery = w % 4 === 0 || w === weeks
      // Рассчитываем длительность build: минимум 1 неделя, максимум 3.
      // Например, берем 15-20% от плана, но ограничиваем рамками [1, 3]
      const buildWeeks = Math.max(
        1,
        Math.min(3, Math.floor(weeks * 0.15)),
      )

      // Фаза пиковых нагрузок
      const isPeakStage = w > weeks * 0.6 && w < weeks
      // фаза плана: 'build', 'base', 'peak', 'taper'
      const currentStage = isRecovery
        ? 'taper'
        : w <= buildWeeks
          ? 'build' // Самая первая фаза (1-3 недели)
          : w <= weeks * 0.6
            ? 'base' // До 60% срока — база
            : 'peak' // Оставшееся время до конца (кроме рекавери) — пик

      const weekGrowth = 1 + w * 0.03 // Плавный рост дистанции тренировок на 3% в неделю
      const recoveryDrop = isRecovery ? 0.75 : 1.0 //востановительная неделя или обычная

      //тренироки этой недели
      const thisWeekSessions = []

      //Обработка 'rest' до обращения к workoutPool
      structure.forEach((type, inx) => {
        if (type === 'rest') {
          if (!hasStrengths) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'Отдых',
              descr: 'Без беговых тренировок.',
              km: 0,
              load: 0,
              isStrength: false,
            })
            return
          } else if (hasStrengths && strengthDays.includes(inx)) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'Отдых',
              descr: 'Без беговых тренировок.',
              km: 0,
              load: 0,
              isStrength: true,
              strength: {
                title: 'Силовая.',
                descr: 'Посмотреть варианты ОФП.',
              },
            })
            return
          } else if (hasStrengths && !strengthDays.includes(inx)) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'Отдых',
              descr: 'Без беговых тренировок.',
              km: 0,
              load: 0,
              isStrength: false,
            })
            return
          } else {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'Отдых',
              descr: 'Без беговых тренировок.',
              km: 0,
              load: 0,
              isStrength: false,
            })
          }
        }
        //обработка последней недели, удаляю длительную, ВС делаю днем соревнований
        if (w === weeks) {
          if (type === 'long' && inx !== 6) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'Отдых',
              descr: 'Полное восстановление.',
              km: 0,
              load: 0,
            })
            return
          } else if (inx === 6) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: 'rest',
              title: 'День соревнований',
              descr: 'Удачи на старте!',
              km: 0,
              load: 0,
            })
            return
          }
        }

        // Фильтрация с проверкой на существование массива в workoutPool
        let options = (workoutPool[type] || []).filter((work) => {
          // 1. Проверяем стадию (базовая проверка)
          const stageMatch =
            work.stage && work.stage.includes(currentStage)
          // 2. Проверяем уровень (если в карточке нет уровней, считаем подходящей для всех)
          const levelMatch =
            !work.levels || work.levels.includes(level)
          // 3. Проверяем дистанцию (если в карточке нет дистанций, считаем подходящей)
          const distanceMatch =
            !work.distance || work.distance.includes(targetGoal)
          // 4. Проверяем, не было ли этой тренировки на прошлой неделе
          const isNotRepeated = !lastWeekId[type].includes(work.id)

          return (
            stageMatch && levelMatch && distanceMatch && isNotRepeated
          )
        })

        // если массив путс, то берем любую тренироку из соответсвующего типа
        if (options.length === 0) {
          options = workoutPool[type].filter((work) =>
            work.stage.includes(currentStage),
          )
        }

        const selected =
          options[Math.floor(Math.random() * options.length)]

        // console.log('Выбранная тренировка из массива: ', selected)

        if (selected) {
          let { calculatedKm, finalTextSegments } =
            generateWorkoutDescription(
              selected,
              levelCoefficient,
              multipliers.distance[targetGoal],
              weekGrowth,
              recoveryDrop,
            )

          // Если вдруг все равно получился NaN (например, из-за входных данных), ставим заглушку
          if (isNaN(calculatedKm)) calculatedKm = selected.km || 5

          // валидатор длительной тренировки
          if (type === 'long' && !isRecovery) {
            const minNeeded =
              minLongRunLimits[targetGoal] * levelCoefficient
            // Если на пике формы пробежка слишком короткая для марафона — подтягиваем её
            if (isPeakStage && calculatedKm < minNeeded) {
              calculatedKm = Math.ceil(minNeeded)
            }
          }

          if (type === 'long') {
            const maxNeeded =
              maxLongRunLimits[targetGoal] * levelCoefficient
            // Если пробежка слишком длинная  то принудительно уменьшаем ее крайнего лимита
            if (calculatedKm > maxNeeded) {
              calculatedKm = Math.ceil(maxNeeded)
            }
          }

          lastWeekId[type].push(selected.id)

          if (!hasStrengths) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: type,
              title: selected.title,
              descr: selected.descr + '.' + finalTextSegments || '',
              km: calculatedKm,
              load: selected.load,
              isStrength: false,
            })
          } else if (hasStrengths && strengthDays.includes(inx)) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: type,
              title: selected.title,
              descr: selected.descr + '.' + finalTextSegments || '',
              km: calculatedKm,
              load: selected.load,
              isStrength: true,
              strength: {
                title: 'Силовая.',
                descr: 'Посмотреть варианты ОФП.',
              },
            })
          } else if (hasStrengths && !strengthDays.includes(inx)) {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: type,
              title: selected.title,
              descr: selected.descr + '.' + finalTextSegments || '',
              km: calculatedKm,
              load: selected.load,
              isStrength: false,
            })
          } else {
            thisWeekSessions.push({
              day: dayNames[inx],
              type: type,
              title: selected.title,
              descr: selected.descr + '.' + finalTextSegments || '',
              km: calculatedKm,
              load: selected.load,
              isStrength: false,
            })
          }
        }
      })

      const weeklyKm = thisWeekSessions.reduce(
        (sum, s) => sum + s.km,
        0,
      )
      const weeklyLoad = thisWeekSessions.reduce(
        (sum, s) => sum + s.load,
        0,
      )

      plan.push({
        weekNumber: w,
        stage: currentStage,
        isRecovery: isRecovery,
        status: getLoadStatus(weeklyLoad),
        weeklyKm: weeklyKm,
        sessions: thisWeekSessions,
      })
    }

    const result = {
      distance: multipliers.names[goal],
      period: `количество тренировачных недель: ${totalWeeks}`,
      title: generateTitlePlan(goal, time),
      pace: countRunPaceFormula(multipliers.meters[goal], time),
      workouts: plan,
    }

    dispatch(setCustomPlan(result))
    // dispatch(fetchCreateCustomPlan(result))
  }

  return { generateRunningPlan }
}

export default useCreatePlan
