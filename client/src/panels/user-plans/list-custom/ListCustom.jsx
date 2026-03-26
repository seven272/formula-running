import ItemPlan from './item-plan/ItemPlan'
import styles from './ListCustom.module.css'

const ListCustom = ({ list }) => {
  return (
    <div className={styles.list_plans}>
      <span className={styles.title}>Созданные планы</span>
      {list && list.length > 0 ?
        list.map((item) => {
          return (
            <div key={item._id} className={styles.item_wrap}>
              <ItemPlan plan={item} />
            </div>
          )
        }) : <span className={styles.text}>--список пуст--</span>}
    </div>
  )
}

export default ListCustom
