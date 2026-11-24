// Joins class names, skipping falsy values: cx('a', isActive && 'b')
export default function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
