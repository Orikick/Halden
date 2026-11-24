import cx from '@/utils/cx';
import Icon from '@/components/ui/Icon/Icon';
import styles from './TextField.module.scss';

// Labelled text input with an optional hint and an inline error message.
// The hint and error are linked to the input with aria-describedby.
export default function TextField({
  name,
  id = name,
  label,
  hint,
  error,
  optional = false,
  className,
  ...inputProps
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <input
        id={id}
        name={name}
        className={cx(styles.input, error && styles.invalid)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={optional ? undefined : 'true'}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
