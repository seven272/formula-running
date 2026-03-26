// фаза плана: 'build', 'base', 'peak', 'taper'
const workoutPool = {
  easy: [
    //блок самых легких тренировок
    {
      id: 100,
      title: 'Вкатывающий бег',
      descr: 'Легкий бег в 1-2 зоне пульса, акцент на восстановление',
      km: 7,
      load: 1,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },
    {
      id: 101,
      title: 'Легкий бег',
      descr: 'Легкий бег в 1-2 зоне пульса, акцент на восстановление',
      km: 6,
      load: 1,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 6 }],
    },
    {
      id: 102,
      title: 'Восстановительная тренировка',
      descr: 'Легкий бег в 1-2 зоне пульса, акцент на восстановление',
      km: 7,
      load: 1,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },
    {
      id: 103,
      title: 'Восстановительный трусцой',
      descr: 'Очень медленный бег, почти шаг',
      km: 6,
      load: 1,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 6 }],
    },
    {
      id: 104,
      title: 'Легкая трусца',
      descr: 'Очень медленный бег, почти шаг',
      km: 6,
      load: 1,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 6 }],
    },
    {
      id: 105,
      title: 'Терапевтический бег',
      descr:
        'Максимально низкий пульс, темп на 1.5-2 минуты медленнее соревновательного',
      km: 6,
      load: 1,
      stage: ['build', 'base', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 6 }],
    },

    {
      id: 106,
      title: 'Легкая разминка',
      descr: 'Минимальный объем для поддержания тонуса мышц',
      km: 5,
      load: 1,
      stage: ['taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['5km', '10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 5 }],
    },
    //блок легких тренировок 2
    {
      id: 107,
      title: 'Базовый кросс',
      descr: 'Равномерный бег в аэробной зоне',
      km: 8,
      load: 1,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 8 }],
    },
    {
      id: 108,
      title: 'Бег + техника',
      descr:
        'Медленный бег с акцентом на контроль постановки стопы и осанку',
      km: 7,
      load: 1,
      stage: ['build', 'base', 'peak', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'easy',
          dist: 7,
          label: 'Темп строго P1, фокус на технику',
        },
      ],
    },

    {
      id: 109,
      title: 'Легкий бег',
      descr: 'Короткая пробежка для приведения организма в тонус',
      km: 7,
      load: 1,
      stage: ['base', 'build', 'peak', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },
    {
      id: 110,
      title: 'Бег по мягкому грунту',
      descr: 'Разгрузка суставов, бег в парке или лесу',
      km: 7,
      load: 1,
      stage: ['build', 'base', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['5km', '10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },

    {
      id: 111,
      title: 'Активное восстановление',
      descr:
        'Легкий бег в 1-й зоне пульса для вымывания продуктов распада после нагрузок',
      km: 8,
      load: 1,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 8 }],
    },

    {
      id: 112,
      title: 'Беговой релакс',
      descr:
        'Пробежка для снятия психологического напряжения без нагрузки на ССС',
      km: 7,
      load: 1,
      stage: ['build', 'base', 'taper', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },
    {
      id: 113,
      title: 'Разгрузочный кросс',
      descr:
        'Спокойный бег по мягкому покрытию (трава, грунт) для разгрузки суставов',
      km: 7,
      load: 1,
      stage: ['build', 'base', 'peak', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 7 }],
    },

    //блок легких тренировок 3
    {
      id: 114,
      title: 'Аэробный бег в зоне 2',
      descr: 'Поддержание базовой выносливости.',
      km: 8,
      load: 1,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['5km', '10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 8 }],
    },
    {
      id: 115,
      title: 'Аэробный фундамент',
      descr:
        'Чуть более длительный, но максимально пологий бег в 1 зоне',
      km: 9,
      load: 2,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [{ type: 'easy', dist: 9 }],
    },
    {
      id: 116,
      title: 'Восстановление с ускорениями',
      descr:
        'Медленный бег, дополненный короткими "протяжками" для разгона крови.',
      km: 8,
      load: 2,
      stage: ['base', 'peak'],
      levels: ['intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'easy',
          dist: 8,
          label: 'Бег P1 + 4 легких ускорения по 80м',
        },
      ],
    },
    {
      id: 117,
      title: 'Мягкий вкат',
      descr: 'Легкая тренировка, чтобы прочувтсвовать мышцы ног',
      km: 6,
      load: 1,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 6 }],
    },
    //блок легких тренировок 4
    {
      id: 118,
      title: 'Аэробный фундамент',
      descr:
        'Чуть более длительный, но максимально пологий бег в 1 зоне',
      km: 9,
      load: 2,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [{ type: 'easy', dist: 9 }],
    },
    {
      id: 119,
      title: 'Легкая пробежка',
      descr: 'Равномерная легкая пробежка в 1-2 зоне',
      km: 8,
      load: 1,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 8 }],
    },
    {
      id: 120,
      title: 'Низкий пульс',
      descr: 'Восстановительная пробежка на низком пульсе',
      km: 9,
      load: 2,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [{ type: 'easy', dist: 9 }],
    },
  ],
  intervals: [
    //блок легких работ 1
    {
      id: 200,
      title: 'Пороговые интервалы',
      descr: 'Отрезки в темпе ПАНО+',
      km: 12,
      load: 5,
      stage: ['build', 'taper', 'base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 3,
          workDist: 2,
          restDist: 0.8,
          label: 'в темпе Р4+.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },
    {
      id: 201,
      title: 'Скоростной тонус',
      descr: 'Легкие интервалы для поддержания формы',
      km: 6,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 4,
          workDist: 0.4,
          restDist: 0.4,
          label: 'в целевом темпе старта.',
        },
        { type: 'cooldown', dist: 1.5, label: 'Заминка' },
      ],
    },

    {
      id: 202,
      title: 'Финишный акцент',
      descr: 'Работа с ускорением в конце отрезка',
      km: 12,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 5,
          workDist: 1,
          restDist: 0.5,
          label: 'начать в темпе P4 закончить отрезок в темпе Р5.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },

    {
      id: 203,
      title: 'Ускорения',
      descr: 'Классические интервалы',
      km: 7,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 4,
          workDist: 1,
          restDist: 0.5,
          label: 'в темпе P5.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },

    {
      id: 204,
      title: 'Классические отрезки',
      descr: 'Развитие максимального потребления кислорода (МПК)',
      km: 8,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 4,
          workDist: 1,
          restDist: 0.5,
          label: 'в темпе P4-P5.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },

    {
      id: 205,
      title: 'Мягкие интервалы',
      descr: 'Короткие отрезки для тонуса, без закисления',
      km: 6.5,
      load: 3,
      stage: ['taper', 'build'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 6,
          workDist: 0.15,
          restDist: 0.25,
          label: 'ускорения в темпе Р5.',
        },
        { type: 'cooldown', dist: 1.1, label: 'Заминка' },
      ],
    },
    {
      id: 206,
      title: 'Аэробные качели',
      descr: 'Легкое чередование целевого и восстановительного темпа',
      km: 7.4,
      load: 4,
      stage: ['taper', 'build'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 3,
          workDist: 1,
          restDist: 0.8,
          label: 'в целевом темпе старта.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 207,
      title: 'Протяжка перед стартом',
      descr: 'Короткие отрезки, чтобы «разбудить» ноги',
      km: 5.5,
      load: 3,
      stage: ['taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Легкий бег' },
        {
          type: 'interval',
          repeats: 4,
          workDist: 0.3,
          restDist: 0.3,
          label: 'в целевой темпе старта (фокус на технике).',
        },
        { type: 'cooldown', dist: 1.3, label: 'Заминка' },
      ],
    },
    //блок тяжелых работ 2
    {
      id: 208,
      title: 'Микс скоростей',
      descr: 'Чередование длинных и коротких быстрых отрезков',
      km: 9,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2.5, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 3,
          workDist: 0.8,
          restDist: 0.4,
          label: 'темп Р5.',
        },
        {
          type: 'interval',
          repeats: 4,
          workDist: 0.2,
          restDist: 0.2,
          label: 'темп Р6.',
        },
        { type: 'cooldown', dist: 1.5, label: 'Заминка' },
      ],
    },

    {
      id: 209,
      title: 'Классические отрезки',
      descr: 'Развитие максимального потребления кислорода (МПК)',
      km: 8,
      load: 5,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 6,
          workDist: 1,
          restDist: 0.5,
          label: 'в темпе P4-P5.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },
    {
      id: 210,
      title: 'Скорость на 500м',
      descr:
        'Работа над экономичностью бега и техникой на высокой скорости',
      km: 7,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 8,
          workDist: 0.5,
          restDist: 0.2,
          label: 'в темпе чуть выше Р5.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },

    {
      id: 211,
      title: 'Короткие спринты',
      descr: 'Взрывная работа для активации быстрых мышечных волокон',
      km: 6,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 10,
          workDist: 0.2,
          restDist: 0.1,
          label: 'в темпе Р5-Р6.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },
    {
      id: 212,
      title: 'Минутки',
      descr: 'Классический фартлек по времени внутри тренировки',
      km: 8,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 10,
          workDist: 0.4,
          restDist: 0.2,
          label: 'в темпе Р5-Р6.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },
    {
      id: 213,
      title: 'Длинный темп',
      descr: 'Длинные отрезки для психологической устойчивости',
      km: 11,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 2,
          workDist: 4,
          restDist: 1,
          label: 'в темпе Р4+.',
        },
        { type: 'cooldown', dist: 1, label: 'Заминка' },
      ],
    },
    {
      id: 214,
      title: 'Стадионные 400-ки',
      descr: 'Развитие скорости и ритма бега',
      km: 8,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 12,
          workDist: 0.4,
          restDist: 0.2,
          label: 'в темпе Р5-Р6.',
        },
        { type: 'cooldown', dist: 1.2, label: 'Заминка' },
      ],
    },
    {
      id: 215,
      title: 'Интервалы в горку',
      descr: 'Развитие мощности толчка и силы ног',
      km: 7,
      load: 5,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'interval',
          repeats: 8,
          workDist: 0.3,
          restDist: 0.3,
          label: 'в темпе Р5.',
        },
        { type: 'cooldown', dist: 1.5, label: 'Заминка' },
      ],
    },
  ],
  tempo: [
    //темповый блок 1
    {
      id: 300,
      title: 'Темповый бег',
      descr: 'Бег на уровне ПАНО, тяжело, но контролируемо',
      km: 10,
      load: 4,
      stage: ['build', 'base', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        { type: 'tempo', dist: 6, label: 'в целевом темпе P4.' },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 301,
      title: 'Классический ПАНО-бег',
      descr:
        'Базовая работа для повышения выносливости на уровне порога',
      km: 10,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        { type: 'tempo', dist: 6, label: 'в темпе P4.' },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 302,
      title: 'Темповая пирамида',
      descr: 'Постепенное увеличение и уменьшение интенсивности',
      km: 11,
      load: 4,
      stage: ['build'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 7,
          label:
            'первая треть в темпе P3 + вторая треть P4 + третья треть P3.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    {
      id: 303,
      title: 'Устойчивый темп',
      descr: 'Длительное удержание целевой скорости полумарафона',
      km: 14,
      load: 5,
      stage: ['build', 'taper'],
      levels: ['advanced'],
      distance: ['21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 10,
          label: 'в стабильном темпе P4.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 304,
      title: 'Вкатывающий темп',
      descr:
        'Знакомство организма с пороговыми нагрузками на этапе базы',
      km: 8,
      load: 3,
      stage: ['build'],
      levels: ['beginner', 'intermediate'],
      distance: ['5km', '10km', '21km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 3,
          label: 'в темпе P4 (контролируемо).',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },
    {
      id: 305,
      title: 'ПАНО-интервалы 3х2км',
      descr:
        'Дробная работа на пороге для лучшего контроля темпа и снижения психологической нагрузки',
      km: 11,
      load: 4,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 6,
          label:
            ', в зависимости от дистанции от 2 до 3 отрезков по 2 км в темпе P4 (ПАНО), отдых 2 мин трусцой.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },

    {
      id: 306,
      title: 'Прогрессивный ПАНО',
      descr: 'Плавный вход из аэробного режима в пороговый',
      km: 13,
      load: 3,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 8,
          label: 'с постепенным ускорением от P3 до P4+.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    {
      id: 307,
      title: 'Крейсерские интервалы (1000м)',
      descr:
        'Классическая работа по Даньелсу для стимуляции ПАНО без избыточного закисления',
      km: 12,
      load: 3,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка + СБУ' },
        {
          type: 'tempo',
          dist: 7,
          label:
            ', разбить дистанцию по 1 км, каждый отрезок в темпе P4, отдых 1 мин трусцой.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },

    {
      id: 308,
      title: 'Короткие пороговые сеты',
      descr:
        'Для тех, кто только начинает внедрять ПАНО-работы в план',
      km: 9,
      load: 3,
      stage: ['build'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 5,
          label:
            'разбить на отрезки по 1 км в темпе P4, отдых между отрезками 2 мин трусцой.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    // темповый бег блок 2
    {
      id: 309,
      title: 'Крейсерский темп',
      descr: 'Работа над экономичностью на скорости ПАНО',
      km: 11,
      load: 3,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        { type: 'tempo', dist: 6, label: 'в строгом темпе P4' },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 310,
      title: 'Короткий жесткий темп',
      descr: 'Интенсивная работа на ПАНО',
      km: 8,
      load: 3,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 4,
          label: 'в темпе чуть быстрее Р4 (ПАНО)',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    {
      id: 311,
      title: 'Длинный порог (cплит)',
      descr:
        'Разбивка длинного ПАНО на две части для поддержания высокого качества бега',
      km: 14,
      load: 5,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 8,
          label:
            ', 2 x 50% от объема в темпе P4, отдых 3 мин трусцой.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },
    {
      id: 312,
      title: 'Переменка (In and Outs)',
      descr:
        'Чередование темпа чуть выше и чуть ниже ПАНО для тренировки лактатного клиренса',
      km: 10,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 6,
          label: 'чередуя: 1км (ПАНО + 10с) / 1км (ПАНО - 5с).',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    {
      id: 313,
      title: 'Темповый бег 3-2-1',
      descr: 'Блоки со снижением дистанции и легким ростом темпа',
      km: 10,
      load: 3,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 6,
          label:
            '50% в темпе P3 + 30% в темпе P4 + 20% в темпе P4, через 200м отдыха.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },

    {
      id: 314,
      title: 'Короткая темповая',
      descr: 'Короткий блок для активации ПАНО',
      km: 7,
      load: 2,
      stage: ['taper', 'base', 'build'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        { type: 'tempo', dist: 2, label: 'в темпе P4.' },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 315,
      title: 'Пирамида ПАНО',
      descr:
        'Вариативная работа для психологического разнообразия при удержании порога',
      km: 13,
      load: 4,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 7,
          label:
            '1-2-3-1 км в темпе P4 (если объем меньше, сократите длинные отрезки), отдых 90 сек трусцой.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },

    //Темповый блок 3
    {
      id: 316,
      title: 'Прогрессивный темпо-ран',
      descr:
        'Постепенное повышение интенсивности с выходом на целевой темп к концу работы',
      km: 12,
      load: 4,
      stage: ['peak', 'base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 7,
          label:
            'каждые 2 км быстрее на 5-10 сек, финиш на темпе P4.',
        },
        { type: 'cooldown', dist: 2, label: 'Заминка' },
      ],
    },
    {
      id: 317,
      title: 'ПАНО + Финишное ускорение',
      descr: 'Развитие умения терпеть и ускоряться на фоне усталости',
      km: 11,
      load: 5,
      stage: ['peak', 'base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 6,
          label: 'в темпе P4 + последний км на максимум.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },

    {
      id: 318,
      title: 'Темпо-микс ПАНО/МПК',
      descr: 'Смешанная нагрузка для подготовки к соревнованиям',
      km: 11,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 2, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 6,
          label:
            'в темпе Р4 (ПАНО) + 4 x 400м в темпе P5 (МПК) через 200м трусцы.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },

    {
      id: 319,
      title: 'Длинный ПАНО-бег (марафонский)',
      descr: 'Специфическая выносливость для опытных бегунов',
      km: 16,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        { type: 'warmup', dist: 3, label: 'Разминка' },
        {
          type: 'tempo',
          dist: 10,
          label: 'стабильно в темпе P4.',
        },
        { type: 'cooldown', dist: 3, label: 'Заминка' },
      ],
    },
  ],
  long: [
    //длительная блок 1
    {
      id: 400,
      title: 'Разгрузочная длительная',
      descr: 'Бег для разгрузки опорно-двигательного аппарата',
      km: 12,
      load: 2,
      stage: ['taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 12,
          label:
            'Укороченная длинная пробежка в темпе P2 для поддержания тонуса',
        },
      ],
    },
    {
      id: 401,
      title: 'Длительная мягкая',
      descr: 'Медленный бег для укрепления связок и ОДА.',
      km: 15,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 15,
          label: 'Длительная пробежка в щадящем режиме в темпе P1-P2',
        },
      ],
    },

    {
      id: 402,
      title: 'Мягкое восстановление',
      descr: 'Короткая длительная для суперкомпенсации',
      km: 13,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 13,
          label: 'Легкий бег в темпе P1-P2 для восстановления',
        },
      ],
    },

    {
      id: 403,
      title: 'Поддерживающая',
      descr: 'Легкая длинная пробежка для сохранения тонуса',
      km: 16,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label: 'Спокойный бег в темпе P1-P2',
        },
      ],
    },
    {
      id: 404,
      title: 'Легкая длительная',
      descr: 'Длинная пробежка для построения аэробного фундамента',
      km: 16,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label: 'Спокойный бег в темпе P1-P2',
        },
      ],
    },
    {
      id: 405,
      title: 'Длительная',
      descr: 'Длинная пробежка в разговорном темпе',
      km: 14,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 14,
          label: 'Бег в темпе P1-P2',
        },
      ],
    },
    {
      id: 406,
      title: 'Длительная на низком пульсе',
      descr:
        'Длинная пробежка для развития сердечно-сосудистой системы',
      km: 14,
      load: 2,
      stage: ['build', 'taper'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 14,
          label: 'Спокойный бег в темпе P1-P2, внимание на пульс',
        },
      ],
    },
    //длительная блок 2
    {
      id: 407,
      title: 'Аэробная длительная',
      descr:
        'Классический бег для развития сердечно-сосудистой системы',
      km: 18,
      load: 3,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 18,
          label:
            'Длинная пробежка в темпе P2 для развития выносливости',
        },
      ],
    },

    {
      id: 408,
      title: 'Базовая аэробная',
      descr:
        'Классический бег для развития сердечно-сосудистой системы',
      km: 16,
      load: 3,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label: 'Равномерный бег в темпе P2',
        },
      ],
    },

    {
      id: 409,
      title: 'Лёгкая аэробная',
      descr: 'Низкоинтенсивный бег для поддержания базы',
      km: 16,
      load: 2,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Лёгкий бег в зоне P2. Фокус на дыхании и технике, без напряжения',
        },
      ],
    },

    {
      id: 410,
      title: 'Пульсовая аэробная',
      descr:
        'Бег в зоне P2 с контролем пульса для стабильного развития выносливости',
      km: 16,
      load: 3,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Равномерный бег в темпе P2 (70–80% ЧСС макс). Следить за пульсом: не выходить за верхнюю границу зоны темпа P2',
        },
      ],
    },
    {
      id: 411,
      title: 'Базовая длительная',
      descr:
        'Классический бег для развития сердечно-сосудистой системы',
      km: 16,
      load: 3,
      stage: ['base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label: 'Равномерный бег в темпе P2',
        },
      ],
    },
    //длительная блок 3
    {
      id: 412,
      title: 'Прогрессивная длительная',
      descr: 'Тренировка с постепенным ускорением',
      km: 16,
      load: 4,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Старт в P2, каждый 4 км ускорение от темпа Р2 до P3',
        },
      ],
    },
    {
      id: 413,
      title: 'Длительная',
      descr: 'Имитация соревновательного объема',
      km: 16,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Равномерный бег в темпе P2. В этой тренировке главное объем, а не темп',
        },
      ],
    },
    {
      id: 414,
      title: 'Контрольная длительная',
      descr: 'Проверка формы на большой дистанции',
      km: 18,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 18,
          label:
            'Длинный бег в темпе P2-Р3 для развития выносливости',
        },
      ],
    },
    {
      id: 415,
      title: 'Марафонский блок',
      descr: 'Отработка целевого темпа на фоне усталости',
      km: 17,
      load: 4,
      stage: ['peak'],
      levels: ['intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 17,
          label:
            'Разминка 2 км в темпе P1. Основной блок: первая половина в темпе P2, вторая половина в темпе P3. Заминка 1 км в темпе P1',
        },
      ],
    },
    {
      id: 416,
      title: 'Длительный кросс',
      descr: 'Силовая выносливость на рельефе',
      km: 16,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Длительный бег по пересеченной местности в темпе P2',
        },
      ],
    },
    {
      id: 417,
      title: 'Длительная с фартлеком',
      descr:
        'Включение быстрых отрезков для развития скоростной выносливости',
      km: 16,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Темп P2 с включением 8 ускорений по 1 мин в темпе Р4 через 2 мин отдыха',
        },
      ],
    },

    {
      id: 418,
      title: 'Быстрый финиш',
      descr: 'Умение прибавить на финише при накопленном лактате',
      km: 15,
      load: 5,
      stage: ['peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 15,
          label:
            'Основной блок в темпе Р2. Заключительные 2км в темпе P4 (ПАНО)',
        },
      ],
    },
    {
      id: 419,
      title: 'Интервальная выносливость',
      descr: 'Длинные повторы внутри объемной тренировки',
      km: 16,
      load: 4,
      stage: ['peak', 'base'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 16,
          label:
            'Основной блок в темпе P2, с включением 3 x 2км в темпе P3 через 1км отдыха',
        },
      ],
    },
    {
      id: 420,
      title: 'Специфический объем',
      descr: 'Работа над экономичностью бега',
      km: 17,
      load: 4,
      stage: ['base', 'peak'],
      levels: ['beginner', 'intermediate', 'advanced'],
      distance: ['10km', '21km', '42km'],
      segments: [
        {
          type: 'long',
          dist: 17,
          label:
            'Равномерный бег в темпе P2+ (на 5-10 сек быстрее базового)',
        },
      ],
    },
  ],
}

export default workoutPool
