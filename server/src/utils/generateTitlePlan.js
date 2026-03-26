
import {
  multipliers,
} from '../data/multipliers.js'

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

export { generateTitlePlan }
