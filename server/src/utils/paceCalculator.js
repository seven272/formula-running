// Вспомогательная функция для форматирования темпа (внутренняя)
const countPace = (dist, time) => {
  const paceRaw = time / (dist / 1000)
  const min = Math.floor(paceRaw / 60)
  const sec = Math.round(paceRaw % 60)
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const countRunPaceFormula = (distanceUser, timeUser) => {
  // 10 км за 40 минут, это 10000 метров за 2400 сек
  const kilometrage = {
    slowRun: 1750000,
    longRun: 600000,
    marathon: 42195,
    halfmarathon: 21095,
    tenKm: 10000,
    fiveKm: 5000,
  }
  const paceTitle = [
    'paceSlow',
    'paceLong',
    'paceMarathon',
    'paceHalfmarathon',
    'pace10',
    'pace5',
  ]
  //секунды для увеличение темпа при расчете облегченных значений
  const paceIncrement = [30, 20, 15, 10, 7, 5]

  const paceObj = {}

  const arrPaces = Object.values(kilometrage).map((km, inx) => {
    const multiplier = 1.06
    // определяю время бега для каждой дистанции
    const time1 = timeUser * (km / distanceUser) ** multiplier
    // расчитываю темп для этого времени
    const pace1 = countPace(km, time1)
    //расчитываю темп для вторых облегченных значений
    const formatPace = pace1.split(':')
    //перевожу в числа и минуты в секунды
    const minValue = Number(formatPace[0]) * 60
    const secValue = Number(formatPace[1])
    //сумма мин, сек и добавленного времени для каждого темпа
    const sum = minValue + secValue + paceIncrement[inx]
    const min = Math.floor(sum / 60)
    const sec = sum % 60
    // Превращаем в строку и добавляем ноль в начало, если цифра одна
    const mm = String(min).padStart(2, '0')
    const ss = String(sec).padStart(2, '0')
    const pace2 = `${mm}:${ss}`

    // Итоговый результат с максимальным и минимальным темпом
    const result = `${pace1}-${pace2} /км`
    return result
  })

  //добавляю значения в обьект
  arrPaces.forEach((elem, inx) => {
    paceObj[paceTitle[inx]] = elem
  })

  return paceObj
}

export {countRunPaceFormula}
