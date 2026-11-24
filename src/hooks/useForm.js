import { useCallback, useMemo, useState } from 'react';
import { validate } from '@/utils/validators';

// Small form state hook: values, validation and "show errors only after the
// user has left a field or tried to submit".
export function useForm({ initialValues, rules, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allErrors = useMemo(() => validate(values, rules), [values, rules]);

  const errors = useMemo(() => {
    const visible = {};
    Object.keys(allErrors).forEach((name) => {
      if (submitted || touched[name]) visible[name] = allErrors[name];
    });
    return visible;
  }, [allErrors, submitted, touched]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((current) => (current[name] ? current : { ...current, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setSubmitted(true);

      const invalidNames = Object.keys(allErrors);
      if (invalidNames.length > 0) {
        // Move focus to the first field with a problem, in form order.
        const firstInvalid = Array.from(event.currentTarget.elements).find((element) =>
          invalidNames.includes(element.name),
        );
        firstInvalid?.focus();
        return;
      }

      onSubmit(values);
    },
    [allErrors, onSubmit, values],
  );

  // Spread onto a field: <TextField {...form.field('email')} />
  const field = useCallback(
    (name) => ({
      name,
      value: values[name],
      error: errors[name],
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, errors, handleChange, handleBlur],
  );

  return {
    values,
    errors,
    errorCount: Object.keys(errors).length,
    field,
    handleChange,
    handleSubmit,
  };
}
