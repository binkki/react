import * as yup from 'yup';
import { FormErrors } from '../types';
import { contriesList } from './constants';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/[A-Z]/, 'First letter should be uppercase')
    .required('Name is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/^\S*$/, 'Password must not contain spaces')
    .matches(/\d/, 'Password must contain at least 1 number')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  password_copy: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please repeat password again'),
  country: yup
    .string()
    .oneOf(contriesList, 'Enter a valid country')
    .required('Country is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .required('The terms and conditions must be accepted')
    .oneOf([true], 'The terms and conditions must be accepted'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileFormat', 'Only png, jpg and jpeg files are allowed', (value) => {
      return (
        value instanceof FileList &&
        value[0] &&
        ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type)
      );
    })
    .test(
      'fileSize',
      'File size must be less than 5MB',
      (value) => value instanceof FileList && value[0] && value[0].size <= 5242880
    ),
});

export const getYupErrors = (errors: yup.ValidationError): FormErrors => {
  const yupErrors: FormErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      yupErrors[error.path] = error.errors[0];
    }
  });

  return yupErrors;
};
