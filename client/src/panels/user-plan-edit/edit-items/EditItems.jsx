import styles from './EditItems.module.css'
import EditItem from './edit-item/EditItem'

const EditItems = ({ plan, typePlan }) => {
  const multipliers = {
    stage: {
      build: 'строительства',
      base: 'базовый',
      peak: 'пиковый',
      taper: 'разгрузочный',
    },
    colors: {
      build: '#b1e4fc',
      base: '#a7bcec',
      peak: '#fd9a9a',
      taper: '#7bf8af',
    },
  }

  return (
    <div className={styles.main_editplan}>
      EditItems
      <div className={styles.plan}>
        <span className={styles.plan_title}>{plan.title}</span>
        {plan.workouts.map((w, inx) => {
          return (
            <div className={styles.week} key={inx}>
              <div
                className={styles.week_header}
                style={{
                  backgroundColor: multipliers.colors[w.stage],
                }}
              >
                <h3>Неделя {w.weekNumber}</h3>
              </div>
              {w.sessions.map((day, inx) => {
                return (
                  <EditItem
                    key={inx}
                    inx={inx}
                    typePlan={typePlan}
                    planId={plan._id}
                    weekId={w._id}
                    d={day}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditItems
