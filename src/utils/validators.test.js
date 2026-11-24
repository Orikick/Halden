import { describe, expect, it } from 'vitest';
import { compose, email, minLength, pattern, required, validate } from './validators';

describe('validators', () => {
  it('required rejects empty and whitespace-only values', () => {
    const check = required('Enter your name');

    expect(check('')).toBe('Enter your name');
    expect(check('   ')).toBe('Enter your name');
    expect(check(undefined)).toBe('Enter your name');
    expect(check('Orest')).toBe('');
  });

  it('minLength checks the trimmed length and lets empty values pass', () => {
    const check = minLength(3, 'Too short');

    expect(check('ab')).toBe('Too short');
    expect(check(' ab ')).toBe('Too short');
    expect(check('abc')).toBe('');
    expect(check('')).toBe('');
  });

  it('pattern tests the trimmed value', () => {
    const check = pattern(/^\d{5}$/, 'Five digits');

    expect(check('1234')).toBe('Five digits');
    expect(check(' 12345 ')).toBe('');
  });

  it('email accepts a normal address and rejects incomplete ones', () => {
    const check = email('Enter a valid email');

    expect(check('orest@example.com')).toBe('');
    expect(check('orest@example')).toBe('Enter a valid email');
    expect(check('orest example.com')).toBe('Enter a valid email');
    expect(check('')).toBe('');
  });

  it('compose returns the first failing message', () => {
    const check = compose(required('Required'), email('Invalid'));

    expect(check('')).toBe('Required');
    expect(check('nope')).toBe('Invalid');
    expect(check('a@b.co')).toBe('');
  });

  it('validate returns messages only for failing fields', () => {
    const rules = {
      name: required('Enter your name'),
      email: compose(required('Enter your email'), email('Enter a valid email')),
    };

    expect(validate({ name: '', email: 'a@b.co' }, rules)).toEqual({ name: 'Enter your name' });
    expect(validate({ name: 'Orest', email: 'a@b.co' }, rules)).toEqual({});
  });
});
