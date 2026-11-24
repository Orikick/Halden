import cx from '@/utils/cx';
import Icon from '@/components/ui/Icon/Icon';
import styles from './Select.module.scss';

// Labelled native <select>. `options` is [{ value, label }].
export default function Select({
  name,
  id = name,
  label,
  options,
  placeholder,
  error,
  required = false,
  className,
  ...selectProps
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={cx(styles.select, error && styles.invalid)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        aria-required={required ? 'true' : undefined}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className={styles.error}>
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
