import styles from './Checkbox.module.css'

const Checkbox = ({
  label,
  value,
  isDisabled,
  changed,
  ...props
}) => {
  return (
    <label className={styles.checkbox_label}>
      <input
        {...props}
        type="checkbox"
        className={styles.real_checkbox}
        checked={value}
        onChange={(evt) => changed(evt.target.checked)}
        disabled={isDisabled}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label_text}>{label}</span>}
    </label>
  )
}

export default Checkbox
