import { typePlans } from '../assets/data/typePlans'
//формируем новый массив в котором в раздел "все" добавляем все планы и дистанции
const useFormTypeAll = (initialState = [...typePlans]) => {
  // в массив добавляем все обьектыы с дистанциями и планами под них
  const nextArr = []
  initialState.map((elem) => {
    return nextArr.push(...elem.distances)
  })
  // тут формируем новый в массив в котором свойство "все" заменяем новым обьектом со всеми дистанциями
  const newList = initialState.map((elem) => {
    if (elem.name === 'все') {
      return {
        name: 'все',
        distances: nextArr,
      }
    } else return elem 
  })

  return {
    newList,
  }
}

export { useFormTypeAll }
