import { FaPersonRunning } from 'react-icons/fa6'
import { GrSwim } from 'react-icons/gr'
import { MdOutlineDirectionsBike } from 'react-icons/md'
import { TbStretching2 } from 'react-icons/tb'
import { GiStrongMan } from 'react-icons/gi'
import { GiWalk } from 'react-icons/gi'

const workouts = [
  {
    id: 'workout-1',
    icon: <TbStretching2 size={20} />,
    title: 'растяжка',
    type: 'stretch',
    subtype: '',
    description:
      'проработка всех мышц, работа над координцией и гибкостью',
    note: '',
    isCompleted: false,
    optional: [],
  },
  {
    id: 'workout-2',
    icon: <GrSwim size={20} />,
    title: 'плавание',
    type: 'swim',
    subtype: '',
    description: 'плавание в бассейне или открытой воде',
    note: '',
    isCompleted: false,
    optional: [],
  },
  {
    id: 'workout-3',
    icon: <MdOutlineDirectionsBike size={20} />,
    title: 'велосипед',
    type: 'bike',
    subtype: '',
    description: 'езда на велосипеде',
    note: '',
    isCompleted: false,
    optional: [],
  },
  {
    id: 'workout-4',
    icon: <GiStrongMan size={20} />,
    title: 'силовая',
    type: 'strength',
    subtype: '',
    description: 'ОФП или комплекс силовых упражнений',
    note: '',
    isCompleted: false,
    optional: [],
  },
  {
    id: 'workout-5',
    icon: <FaPersonRunning size={20} />,
    title: 'бег',
    type: 'run',
    subtype: '',
    description: 'бег любой продолжительности и скорости',
    note: '',
    isCompleted: false,
    optional: [],
  },
  {
    id: 'workout-6',
    icon: <GiWalk size={20} />,
    title: 'другое',
    type: 'other',
    subtype: '',
    description: 'любая другая тренированчая активность',
    note: '',
    isCompleted: false,
    optional: [],
  },
]

export default workouts
