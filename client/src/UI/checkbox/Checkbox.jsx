import styles from './Checkbox.module.css'

const Checkbox = ({
  label,
  value,
  isDisabled,
  changed,
  ...props
}) => {
  return (
    <div className={styles.checkbox_wrapper}>
      <input
        {...props}
        type="checkbox"
        className={styles.real_checkbox} // Скрываем
        checked={value}
        onChange={(evt) => changed(evt.target.checked)}
        disabled={isDisabled}
      />
      <label className={styles.custom_checkbox}>
        <span className={styles.checkmark}></span>
        {/* Рисуем здесь */}
        {label && <span className={styles.label_text}>{label}</span>}
      </label>
    </div>
  )
}

export default Checkbox
