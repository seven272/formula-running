import RunIcon from '../images/icons/run.png'
// import SwimIcon from '../images/icons/swim.png'
// import BikeIcon from '../images/icons/bike.png'
import TriIcon from '../images/icons/tri.png'

const schemaSearch = [
  { 
    type: 'run',
    title: 'бег',
    image: RunIcon,
    distances: ['42км', '21км', '10км', '5км'],
  },
  // {
  //   type: 'bike', 
  //   title: 'велосипед',
  //   image: BikeIcon,
  //   distances: ['100км', '50км', '20км'],
  // },
  // {
  //   type: 'swim',
  //   title: 'плавание',
  //   image: SwimIcon,
  //   distances: ['10км', '5км', '3км', '1км'],
  // },
  {
    type: 'tri',
    title: 'триатлон', 
    image: TriIcon,
    distances: [
      'железная дистанция',
      'половинка',
      'олимпийка',
      'спринт',
    ],
  },
]

export default schemaSearch
