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
      const repeats = Math.max(1, Math.round(seg.repeats * multCoef))
      segKm = roundToHalf(
        (seg.workDist + (seg.restDist || 0)) * repeats,
      )
      text = `${repeats} x ${seg.workDist}км через ${seg.restDist}км отдыха ${seg.label}`
    }

    arrDescr.push(text)
    calculatedKm += segKm
  })

  const finalTextSegments = arrDescr.join(' ')

  return {
    calculatedKm,
    finalTextSegments,
  }
}
export { generateWorkoutDescription }
