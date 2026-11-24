import { Link } from 'react-router-dom';
import cx from '@/utils/cx';
import styles from './Button.module.scss';

// Renders a router <Link> when `to` is given, otherwise a <button>.
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  type = 'button',
  disabled = false,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
