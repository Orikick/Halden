// Each validator returns an error message, or '' when the value is fine.

const text = (value) => String(value ?? '').trim();

export const required = (message) => (value) => (text(value) ? '' : message);

export const minLength = (length, message) => (value) =>
  !text(value) || text(value).length >= length ? '' : message;

// Optional fields pass when empty; combine with required() to make them mandatory.
export const pattern = (regex, message) => (value) =>
  !text(value) || regex.test(text(value)) ? '' : message;

export const email = (message) => pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message);

// Runs validators in order and returns the first error.
export const compose =
  (...validators) =>
  (value, values) => {
    for (const validator of validators) {
      const message = validator(value, values);
      if (message) return message;
    }
    return '';
  };

// rules: { fieldName: validator }. Returns { fieldName: message } for failing fields only.
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([name, validator]) => {
    const message = validator(values[name], values);
    if (message) errors[name] = message;
  });
  return errors;
}
