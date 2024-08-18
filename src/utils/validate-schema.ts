import * as yup from 'yup';
import { isImage, isValidExtension, isValidFile, isValidSize } from '@/utils/validate-helpers';
import { COUNTRIES } from '@/app/features/country';
import { IMAGE_EXTENSIONS, IMAGE_SIZE } from './validate-file-info';

const formFields = {
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must be started with a capital letter')
    .required('Name is a required field'),
  age: yup
    .number()
    .test('age', 'Invalid age', (value) => Number.isInteger(value))
    .min(0, 'Invalid age')
    .required('Name is a required field'),
  gender: yup.string().required('Gender is a required field'),
  email: yup.string().email().required('Email is a required field'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[a-z])(?=.*[@$!%*?&#^]).{4,30}$/,
      'The password must include at least one uppercase letter, one lowercase letter, one number and one special character!'
    )
    .required('Password is a required field'),
  match_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  image: yup
    .mixed()
    .test('required', 'A file is required', (value) => {
      return isValidFile(value);
    })
    .test('fileType', 'File must be an image', (value) => {
      return isImage(value);
    })
    .test('fileExtension', 'File must have an jpeg or png extension', (value) => {
      return isValidExtension(value);
    })
    .test('fileSize', 'The file is too large', (value) => {
      return isValidSize(value);
    }),
  country: yup
    .string()
    .test('country', 'Pick a country from the list', (value) => {
      if (value) {
        return COUNTRIES.includes(value);
      }
      return false;
    })
    .required('Country is a required field'),
  condition: yup
    .mixed()
    .oneOf([true, 'on'], 'You must accept the conditions')
    .required('You must accept the conditions'),
};

const uncontrolledFormFields = {
  ...formFields,
  image: yup
    .mixed()
    .test('required', 'A file is required', (value) => {
      return value && value instanceof File;
    })
    .test('fileType', 'File must be an image', (value) => {
      return value && value instanceof File && value.type.startsWith('image/');
    })
    .test('fileExtension', 'File must have an jpeg or png extension', (value) => {
      if (value && value instanceof File) {
        const extension = value.name.split('.').pop();
        return extension ? IMAGE_EXTENSIONS.includes(extension) : false;
      }
      return false;
    })
    .test('fileSize', 'The file is too large', (value) => {
      return value && value instanceof File && value.size <= IMAGE_SIZE;
    }),
};

export const controlledFormSchema = yup.object().shape(formFields);

export const unControlledFormSchema = yup.object().shape(uncontrolledFormFields);

export type FormData = yup.InferType<typeof controlledFormSchema>;
