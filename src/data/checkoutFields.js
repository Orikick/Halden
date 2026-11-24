import { compose, email, minLength, pattern, required } from '@/utils/validators';

export const initialCheckoutValues = {
  email: '',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  delivery: 'standard',
  payment: 'card-on-delivery',
};

export const checkoutRules = {
  email: compose(
    required('Enter your email address'),
    email('Enter an email address in the format name@example.com'),
  ),
  fullName: compose(
    required('Enter your full name'),
    minLength(2, 'Your name needs at least 2 characters'),
  ),
  phone: pattern(
    /^\+?[\d\s()-]{7,20}$/,
    'Enter a phone number using digits, spaces and + only, or leave it blank',
  ),
  address: required('Enter your street address'),
  city: required('Enter your town or city'),
  postalCode: compose(
    required('Enter your postal code'),
    pattern(/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/, 'Enter a postal code of 3 to 10 letters or digits'),
  ),
  country: required('Choose a country'),
};

export const countries = [
  'Austria',
  'Belgium',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Netherlands',
  'Poland',
  'Portugal',
  'Spain',
  'Sweden',
  'Ukraine',
  'United Kingdom',
  'United States',
].map((name) => ({ value: name, label: name }));

export const deliveryOptions = [
  { value: 'standard', label: 'Standard delivery', description: '3 to 5 working days' },
  { value: 'express', label: 'Express delivery', description: 'Next working day' },
];

export const paymentOptions = [
  {
    value: 'card-on-delivery',
    label: 'Card on delivery',
    description: 'Pay the courier by card or phone',
  },
  { value: 'cash-on-delivery', label: 'Cash on delivery', description: 'Have the exact amount ready' },
];
