import { useState } from 'react'
const useTrainingPace = () => {
  const [paces, setPaces] = useState(null)
  
  const calcPaces = (distance, objTime) => {
    var timeDoneSecs =
      objTime.h * 3600 + objTime.m * 60 + objTime.s * 1

    // это дистанция 5, 10, 21км
    var raceDone = Number(distance)

    if (timeDoneSecs <= 0 || isNaN(timeDoneSecs)) {
      window.alert('Пожалуйста, введите коректные данные')
      return
    }

    //установливаю время забега на 10 км в секундах
    var tenkRaceTime = timeDoneSecs * Math.pow(10 / raceDone, 1.0747)

    //поправочные коэффициенты
    var fact5k = 0.474769776
    var fact10k = 1
    //var factThresh = 1.667192625;
    var factMarathon = 4.699193095
    var factLongRun = 27.71415586

    //GC factor for threshold
    // calculates pace for predicted distance run in one hour рассчитывает темп для прогнозируемой дистанции бега за один час
    var propofHour = tenkRaceTime / 3600
    var ThreshPredictFactor = Math.pow(3600 / tenkRaceTime, 1.0747)
    var ThreshOneHourTime = tenkRaceTime * ThreshPredictFactor
    var threshPerkm = (ThreshOneHourTime * propofHour) / 10

    // метрики темпа на км в секундах
    var tp5k = Math.round((tenkRaceTime * fact5k) / 5) 
    var tp10k = Math.round((tenkRaceTime * fact10k) / 10)
    var tpThresh2 = Math.round(threshPerkm)
    var tpMarathon = Math.round((tenkRaceTime * factMarathon) / 42.2)
    var tpLongRun = Math.round((tenkRaceTime * factLongRun) / 220)

    // метрики темпа на километр в секундах
    // var tp5kM = Math.round(tp5k * 1.609)
    // var tp10kM = Math.round(tp10k * 1.609)
    // //var tpThreshM = Math.round(tpThresh*1.609);
    // var tpThresh2M = Math.round(tpThresh2 * 1.609)
    // var tpMarathonM = Math.round(tpMarathon * 1.609)
    // var tpLongRunM = Math.round(tpLongRun * 1.609)

    // 400m pace time
    var tp5k400 = Math.round(tp5k / 2.5)
    var tp10k400 = Math.round(tp10k / 2.5)
    var tpThresh2400 = Math.round(tpThresh2 / 2.5)
    var tpMarathon400 = Math.round(tpMarathon / 2.5)
    var tpLongRun400 = Math.round(tpLongRun / 2.5)

    // frm.$5kM.value = Math.floor(tp5kM/60) + " : " + ("0" + (tp5kM % 60)).slice (-2) + " /mile";
    let five =
      Math.floor(tp5k / 60) +
      ' : ' +
      ('0' + (tp5k % 60)).slice(-2) +
      ' /km'
    let five400 =
      Math.floor(tp5k400 / 60) +
      ' : ' +
      ('0' + (tp5k400 % 60)).slice(-2) +
      ' /400m  -  RPE 8-9'

    // frm.$10kM.value = Math.floor(tp10kM/60) + " : " + ("0" + (tp10kM % 60)).slice (-2) + " /mile";
    let ten =
      Math.floor(tp10k / 60) +
      ' : ' +
      ('0' + (tp10k % 60)).slice(-2) +
      ' /km'
    let ten400 =
      Math.floor(tp10k400 / 60) +
      ' : ' +
      ('0' + (tp10k400 % 60)).slice(-2) +
      ' /400m  -  RPE 7-8'

    // frm.threshM.value = Math.floor(tpThresh2M/60) + " : " + ("0" + (tpThresh2M % 60)).slice (-2) + " /mile";
    let pano =
      Math.floor(tpThresh2 / 60) +
      ' : ' +
      ('0' + (tpThresh2 % 60)).slice(-2) +
      ' /km'
    let pano400 =
      Math.floor(tpThresh2400 / 60) +
      ' : ' +
      ('0' + (tpThresh2400 % 60)).slice(-2) +
      ' /400m  -  RPE 6-7'

    // frm.marathonM.value = Math.floor(tpMarathonM/60) + " : " + ("0" + (tpMarathonM % 60)).slice (-2) + " /mile";
    let marathon =
      Math.floor(tpMarathon / 60) +
      ' : ' +
      ('0' + (tpMarathon % 60)).slice(-2) +
      ' /km'
    let marathon400 =
      Math.floor(tpMarathon400 / 60) +
      ' : ' +
      ('0' + (tpMarathon400 % 60)).slice(-2) +
      ' /400m  -  RPE 5-6'

    // frm.longM.value = Math.floor(tpLongRunM/60) + " : " + ("0" + (tpLongRunM % 60)).slice (-2) + " /mile";
    let long =
      Math.floor(tpLongRun / 60) +
      ' : ' +
      ('0' + (tpLongRun % 60)).slice(-2) +
      ' /km'
    let long400 =
      Math.floor(tpLongRun400 / 60) +
      ' : ' +
      ('0' + (tpLongRun400 % 60)).slice(-2) +
      ' /400m  -  RPE 4-5'
    const result = {
      five,
      five400,
      ten,
      ten400,
      pano,
      pano400,
      marathon,
      marathon400,
      long,
      long400,
    }

    setPaces(result)
    console.log(result)
  }

  return { calcPaces, paces }
}

export default useTrainingPace 
