// src/utils/validation.js
import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
  .string()
  .matches(/^(03[0-9]{9}|(\+92)[0-9]{10})$/, 'Please enter a valid phone number')
  .required('Phone is required'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});