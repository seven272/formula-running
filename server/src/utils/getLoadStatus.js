// Оценка уровня усталости по сумме баллов нагрузки за неделю
const getLoadStatus = (totalLoad) => {
  if (totalLoad <= 10) return '🟢 легкая (восстановление)'
  if (totalLoad <= 14) return '🟡 средняя (поддержание)'
  if (totalLoad <= 18) return '🟠 высокая (развитие)'
  return '🔴 пиковая (стресс)'
}

export { getLoadStatus }
