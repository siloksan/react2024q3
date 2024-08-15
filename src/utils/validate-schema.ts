import * as yup from 'yup';
import { isImage, isValidExtension, isValidFile, isValidSize } from '@/utils/validate';

export const schema = yup.object().shape({
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
  country: yup.string().required('Country is a required field'),
  condition: yup.boolean().oneOf([true], 'You must accept the conditions').required('You must accept the conditions'),
});

export type FormData = yup.InferType<typeof schema>;
