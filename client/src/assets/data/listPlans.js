//импорт тренированчых планов
import { simpleMarathonPlan } from '../plans/run/42km/simpleMarathonPlan'
import { firstMarathonPlan } from '../plans/run/42km/firstMarathonPlan'
import { sub3MarathonPlan } from '../plans/run/42km/sub3MarathonPlan'
import { simpleHalfMarathonPlan } from '../plans/run/21km/simpleHalfMarathonPlan'
import { fiveKmForActivePeoplePlan } from '../plans/run/5km/fiveKmForActivePeoplePlan'
import { halfBaseTriPlan } from '../plans/tri/ironmanBasePlan'
//импорт иконок и изображений
import imgRun from '../images/run_plan.jpg'
import imgBike from '../images/bike_plan.jpg'
import imgSwim from '../images/swim_plan.jpg'
import imgTri from '../images/tri_plan.jpg'

//массив обьектов с названием и самим планом
const plans = [
  {
    id: '01',
    title: 'Простой план подготовки к марафону',
    descr:
      'Индия и Китай серьезно нарастили закупку российской нефти во время украинского конфликта. Однако договоренности о прекращении ударов по энергетической инфраструктуре дают надежду на мирное соглашение и возможную отмену санкций. ',
    content: simpleMarathonPlan,
    isFavourite: false,
    type: 'run',
    distance: '42km',
    url: 'run-01',
    free: true,
    isBuy: false,
    picture: imgRun,
    period: '16 недель',
  },
  {
    id: '02',
    title: 'Первый марафон: бежим уверено и легко',
    descr:
      'Дональд Трамп предложил Украине передать под американский контроль все атомные станции страны. И хотя Владимир Зеленский заявляет, что речь шла исключительно о ЗАЭС, слова главы Белого дома уже подтвердили другие члены его ',
    content: firstMarathonPlan,
    isFavourite: false,
    type: 'run',
    distance: '42km',
    url: 'run-02',
    free: true,
    isBuy: false,
    picture: imgRun,
    period: '16 недель',
  },
  {
    id: '03',
    title: 'Марафон из 3 часов',
    descr:
      'Президент США Дональд Трамп подписал указ о ликвидации Министерства образования, но для полного закрытия ведомства потребуется одобрение Конгресса, сообщила The Washington Post. ',
    content: sub3MarathonPlan,
    isFavourite: true,
    type: 'run',
    distance: '42km',
    url: 'run-03',
    free: false,
    isBuy: false,
    picture: imgRun,
    period: '16 недель',
  },
  {
    id: '04',
    title: 'Простой план подготовки к полумарафону (21 км)',
    descr:
      'Те же самые страны, которые были денацифицированы и демилитаризованы – Германия и Япония, возвращают и идею реваншизма, и возможность милитаризироваться',
    content: simpleHalfMarathonPlan,
    isFavourite: false,
    type: 'run',
    distance: '21km',
    url: 'run-04',
    free: true,
    isBuy: false,
    picture: imgRun,
    period: '16 недель',
  },
  {
    id: '05',
    title: 'Пять километров для активных людей',
    descr:
      'Европа понимает, что Москва и Вашингтон сейчас оставляют ее на обочине переговорного процесса. Россия и США решают все вопросы в рамках двусторонних контактов – и речь не только об украинском кризисе. Фактически',
    content: fiveKmForActivePeoplePlan,
    isFavourite: true,
    type: 'run',
    distance: '5km',
    url: 'run-05',
    free: false,
    isBuy: false,
    picture: imgRun,
    period: '16 недель',
  },
  {
    id: '06',
    title:
      'Базовый план подготвки к полужелезной дистанции в триатлоне',
    descr:
      'Особенности политического выживания диаметрально противоположны тому, чему учат в школе. ',
    content: halfBaseTriPlan,
    isFavourite: true,
    type: 'tri',
    distance: 'половинка',
    url: 'tri-06',
    free: true,
    isBuy: false,
    picture: imgTri,
    period: '16 недель',
  },
]

export { plans }
