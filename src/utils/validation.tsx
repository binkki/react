import * as yup from 'yup';
import { FormErrors } from '../types';
import {
  ageRequired,
  contriesList,
  countryRequired,
  emailPattern,
  emailRequired,
  imageExt,
  imageRequired,
  imageSize,
  invalidCountry,
  maxAge,
  maxAgeRequired,
  minAge,
  minAgeRequired,
  nameRequired,
  passwordMatch,
  passwordRequired,
  termsAccept,
  textLowerPattern,
  textNumberPattern,
  textSymbolPattern,
  textUpperPattern,
  whtespacesPattern,
} from './constants';

export const schema = yup.object().shape({
  name: yup.string().matches(textUpperPattern.regex, textUpperPattern.error).required(nameRequired),
  age: yup.number().min(minAge, minAgeRequired).max(maxAge, maxAgeRequired).required(ageRequired),
  email: yup
    .string()
    .email(emailPattern.error)
    .matches(emailPattern.regex, emailPattern.error)
    .required(emailRequired),
  password: yup
    .string()
    .matches(whtespacesPattern.regex, whtespacesPattern.error)
    .matches(textNumberPattern.regex, textNumberPattern.error)
    .matches(textUpperPattern.regex, textUpperPattern.error)
    .matches(textLowerPattern.regex, textLowerPattern.error)
    .matches(textSymbolPattern.regex, textSymbolPattern.error)
    .required(passwordRequired),
  password_copy: yup
    .string()
    .oneOf([yup.ref('password')], passwordMatch)
    .required(passwordRequired),
  country: yup.string().oneOf(contriesList, invalidCountry).required(countryRequired),
  gender: yup.string().required(),
  terms: yup.boolean().required(termsAccept).oneOf([true], termsAccept),
  image: yup
    .mixed()
    .required(imageRequired)
    .test('fileFormat', imageExt, (value) => {
      return (
        value instanceof FileList &&
        value[0] &&
        ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type)
      );
    })
    .test(
      'fileSize',
      imageSize,
      (value) => value instanceof FileList && value[0] && value[0].size <= 5242880
    ),
});

export const getValidationErrors = (errors: yup.ValidationError): FormErrors => {
  const yupErrors: FormErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      yupErrors[error.path] = error.errors[0];
    }
  });

  return yupErrors;
};
