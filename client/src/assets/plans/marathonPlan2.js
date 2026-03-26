const infoPlan = {
  title: 'План на марафон тестовый структура',
  descr: 'В этом плане тестирую только структуру и тогда далее...',
}
 
const arrTypes = [
  'run',
  'bike',
  'swim',
  'stretch',
  'strength',
  'rest',
  'other',
]

const arrSubtypes = [
  'easy',
  'long',
  'intervals',
  'tempo',
  'progression',
  'fartlek',
  'hills',
  'exercises',
  'other',
]

const marathonPlan = [
  //1 неделя
  [
    {
      id: 1,
      day: 'ПН',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [ 
        {
          id: '3ff34',
          title: 'Плавание в бассейне',
          type: 'swim',
          subtype: 'easy',
          description: 'плыть в бассике',
          note: 'тут дополнительные примечание, если потребуется',
          isCompleted: false,
        },
        {
          id: '3ff75534',
          title: 'Бег за городом',
          type: 'run',
          subtype: 'hills',
          description:
            'плыть в бассике lorem dddddddddddddddd  border-right: 2px solid var(--color-white);',
          note: 'тут дополнительные примечание, если потребуется',
          isCompleted: false,
        },
      ],
    },
    {
      id: 2,
      day: 'ВТ',
      title: 'быстрый финиш(40 мин)',
      type: 'bike',
      subtype: arrSubtypes[3],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 3,
      day: 'СР',
      title: 'базовая(40 мин)',
      type: 'bike',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 4,
      day: 'ЧТ',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 5,
      day: 'ПТ',
      title: 'фартлек(33 мин)',
      type: 'swim',
      subtype: arrSubtypes[5],
      description:
        '5 минут в зоне 1, 5 минут в зоне 2, 6 х (1 минута в зоне 4 / 2 минуты в зоне 1), 5 минут в зоне 1',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 6,
      day: 'СБ',
      title: 'базовая(40 мин)',
      type: 'swim',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 7,
      day: 'ВС',
      title: 'длительная(13 км)',
      type: 'run',
      subtype: arrSubtypes[6],
      description: '2 км в зоне 1, 10 км в зоне 2, 1 км в зоне 1',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
  ],
  //2 неделя
  [
    {
      id: 8,
      day: 'ПН',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 9,
      day: 'ВТ',
      title: 'быстрый финиш(47 мин)',
      type: 'run',
      subtype: arrSubtypes[4],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 12 минут в зоне',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 10,
      day: 'СР',
      title: 'базовая(45 мин)',
      type: 'run',
      subtype: arrSubtypes[2],
      description:
        '5 минут в зоне 1, 35 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 11,
      day: 'ЧТ',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[2],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 12,
      day: 'ПТ',
      title: 'фартлек(35 мин)',
      type: 'run',
      subtype: arrSubtypes[5],
      description:
        '5 минут в зоне 1, 5 минут в зоне 2, 5 х (2 минута в зоне 4 / 2 минуты в зоне 1), 5 минут в зоне 1',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 13,
      day: 'СБ',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[1],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 14,
      day: 'ВС',
      title: 'длительная(14 км)',
      type: 'run',
      subtype: arrSubtypes[6],
      description: '2 км в зоне 1, 11 км в зоне 2, 1 км в зоне 1',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
  ],
  //3 неделя
  [
    {
      id: 15,
      day: 'ПН',
      title: 'отдых',
      type: 'rest',
      subtype: arrSubtypes[6],
      description: '',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 16,
      day: 'ВТ',
      title: 'быстрый финиш(40 мин)',
      type: 'run',
      subtype: arrSubtypes[6],
      description:
        '5 минут в зоне 1, 25 минут в зоне 2, 10 минут в зоне 3',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 17,
      day: 'СР',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 18,
      day: 'ЧТ',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[0],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 19,
      day: 'ПТ',
      title: 'фартлек(33 мин)',
      type: 'run',
      subtype: arrSubtypes[4],
      description:
        '5 минут в зоне 1, 5 минут в зоне 2, 6 х (1 минута в зоне 4 / 2 минуты в зоне 1), 5 минут в зоне 1',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 20,
      day: 'СБ',
      title: 'базовая(40 мин)',
      type: 'run',
      subtype: arrSubtypes[3],
      description:
        '5 минут в зоне 1, 30 минут в зоне 2, 5 минут в зоне 1 или кросс-тренинг',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
    {
      id: 21,
      day: 'ВС',
      title: 'длительная(12 км)',
      type: 'run',
      subtype: arrSubtypes[6],
      description: '2 км в зоне 1, 9 км в зоне 2, 1 км в зоне 1 ',
      note: 'тут дополнительные примечание, если потребуется',
      isCompleted: false,
      optional: [],
    },
  ],
]

export { marathonPlan, infoPlan, arrTypes, arrSubtypes }
