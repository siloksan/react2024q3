import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import styles from './controlled-form.module.scss';
import { isImage, isValidExtension, isValidFile, isValidSize } from '@/utils/validate';
import { RootState } from '@/app/store';

const schema = yup.object().shape({
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
  password: yup.string().min(8).max(32).required('Password is a required field'),
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
  country: yup.string().required('Password is a required field'),
  condition: yup.boolean().oneOf([true], 'You must accept the conditions'),
});

type FormData = yup.InferType<typeof schema>;

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (data) reset();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className={styles.title}>Controlled Form</h2>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} placeholder="name" type="text" autoComplete="given-name" />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="age">Age</label>
        <input id="age" {...register('age')} type="number" min={0} />
        {errors.age && <span className={styles.error}>{errors.age.message}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} placeholder="email" type="email" autoComplete="email" />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register('password')}
          placeholder="password"
          type="password"
          autoComplete="current-password"
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} type="text" autoComplete="country" />
        {errors.country && <span className={styles.error}>{errors.country.message}</span>}
      </div>
      <fieldset className={styles.field}>
        <legend>Your Gender:</legend>
        <div className={styles.radio}>
          <div>
            <input id="gender_male" {...register('gender')} type="radio" value="male" />
            <label htmlFor="gender_male">Male</label>
          </div>
          <div>
            <input id="gender_female" {...register('gender')} type="radio" value="female" />
            <label htmlFor="gender_female">Female</label>
          </div>
        </div>
        {errors.gender && <span className={styles.error}>{errors.gender.message}</span>}
      </fieldset>
      <div className={styles.field}>
        <label htmlFor="image">Upload your avatar</label>
        <input id="image" {...register('image')} type="file" />
        {errors.image && <span className={styles.error}>{errors.image.message}</span>}
      </div>
      <div className={`${styles.field} ${styles.condition}`}>
        <input id="condition" {...register('condition')} placeholder="condition" type="checkbox" />
        <label htmlFor="condition">I accept the terms and conditions</label>
      </div>
      {errors.condition && <span className={styles.error}>{errors.condition.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
