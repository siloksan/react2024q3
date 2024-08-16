import { createRef, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ValidationError } from 'yup';
import { RootState } from '@/app/store';
import { SerializeUserData, submitForm } from '@/app/features/submit-form';

import styles from './uncontrolled-form.module.scss';
import { uncontrolledSchema } from '@/utils/validate-schema-uncontrolled';

const initialErrors = {
  name: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  image: '',
  country: '',
  condition: '',
};

export default function UncontrolledForm() {
  const navigate = useNavigate();
  const [county, setCountry] = useState('');
  const dispatch = useDispatch();
  const ref = createRef<HTMLFormElement>();
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState(initialErrors);

  const countries = useSelector((state: RootState) => state.countries.value);
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setErrors(initialErrors);
    if (!ref.current) return;
    const data = new FormData(ref.current);

    const formDataObj: Record<string, string | File> = {};
    data.forEach((value, key) => {
      formDataObj[key] = value;
    });
    try {
      await uncontrolledSchema.validate(formDataObj, { abortEarly: false });
      if ('image' in formDataObj && formDataObj.image instanceof File && formDataObj.image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const serializeData = { ...formDataObj, image: reader.result.toString(), id: new Date().getTime() };
            dispatch(submitForm(serializeData as SerializeUserData));
            navigate('/');
          }
        };
        reader.readAsDataURL(formDataObj.image);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          const { path, message } = error;
          if (typeof path === 'string') {
            setErrors((prev) => ({ ...prev, [path]: message }));
          }
        });
      }
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCountry(event.target.value);
    if (countryRef.current) countryRef.current.value = county;
  };

  const dropdown = () => {
    return countries
      .filter((item: string) => item.includes(county) && item !== county && county !== '')
      .map((item: string) => {
        return (
          <li key={item} onClick={() => setCountry(item)} aria-hidden="true">
            {item}
          </li>
        );
      });
  };

  return (
    <form className={styles.container} ref={ref} onSubmit={onSubmitHandler}>
      <h2 className={styles.title}>Uncontrolled Form</h2>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="name" type="text" autoComplete="given-name" />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" min={0} />
        {errors.age && <span className={styles.error}>{errors.age}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="email" type="email" autoComplete="email" />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" placeholder="password" type="password" autoComplete="current-password" />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          ref={countryRef}
          placeholder="country"
          onChange={onChange}
          autoComplete="country"
        />
        {errors.country && <span className={styles.error}>{errors.country}</span>}
        <div className={styles.dropdownContainer}>
          <ul className={styles.dropdown}>{dropdown()}</ul>
        </div>
      </div>
      <fieldset className={styles.field}>
        <legend>Your Gender:</legend>
        <div className={styles.radio}>
          <div>
            <input id="gender_male" name="gender" type="radio" value="male" />
            <label htmlFor="gender_male">Male</label>
          </div>
          <div>
            <input id="gender_female" name="gender" type="radio" value="female" />
            <label htmlFor="gender_female">Female</label>
          </div>
        </div>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </fieldset>
      <div className={styles.field}>
        <label htmlFor="image">Upload your avatar</label>
        <input id="image" name="image" type="file" accept="image/png, image/jpeg" />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>
      <div className={`${styles.field} ${styles.condition}`}>
        <input id="condition" name="condition" type="checkbox" />
        <label htmlFor="condition">I accept the terms and conditions</label>
      </div>
      {errors.condition && <span className={styles.error}>{errors.condition}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
