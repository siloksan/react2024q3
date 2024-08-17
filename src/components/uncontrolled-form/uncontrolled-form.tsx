import { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ValidationError } from 'yup';
import { RootState } from '@/app/store';
import { SerializeUserData, submitForm } from '@/app/features/submit-form';
import ShowPasswordButton from '../show-password-btn/show-password-btn';
import { unControlledFormSchema } from '@/utils/validate-schema';

import styles from '@/styles/form.module.scss';

const initialErrors = {
  name: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  match_password: '',
  image: '',
  country: '',
  condition: '',
};

export default function UncontrolledForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = createRef<HTMLFormElement>();
  const [errors, setErrors] = useState(initialErrors);
  const [strength, setStrength] = useState(0);

  const getStrength = (password: string) => {
    if (errors.password.length > 0) return 0;
    const { length } = password;
    if (length > 6 && length < 10) return 2;
    if (length >= 10) return 3;
    if (length >= 4) return 1;
    return 0;
  };

  const countries = useSelector((state: RootState) => state.countries.value);
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setErrors(initialErrors);
    if (!ref.current) return;
    const data = new FormData(ref.current);
    setStrength(getStrength(data.get('password') as string));

    const formDataObj: Record<string, string | File> = {};
    data.forEach((value, key) => {
      formDataObj[key] = value;
    });
    try {
      await unControlledFormSchema.validate(formDataObj, { abortEarly: false });
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

  const option = () => {
    return countries.map((item: string) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  };

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const toggleFirstPasswordVisibility = () => {
    setShowFirstPassword(!showFirstPassword);
  };

  const toggleSecondPasswordVisibility = () => {
    setShowSecondPassword(!showSecondPassword);
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
        <div className={styles.strength}>
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.password}>
          <input
            id="password"
            name="password"
            placeholder="password"
            type={showFirstPassword ? 'text' : 'password'}
            autoComplete="current-password"
          />
          <ShowPasswordButton
            showPassword={showFirstPassword}
            togglePasswordVisibility={toggleFirstPasswordVisibility}
          />
        </div>
        <meter id="password_strength" min={0} value={strength} max={3} low={1} high={3} optimum={2} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="match_password">Confirm password</label>
        <div className={styles.password}>
          <input
            id="match_password"
            name="match_password"
            placeholder="password"
            type={showSecondPassword ? 'text' : 'password'}
            autoComplete="current-password"
          />
          <ShowPasswordButton
            showPassword={showSecondPassword}
            togglePasswordVisibility={toggleSecondPasswordVisibility}
          />
        </div>
        {errors.match_password && <span className={styles.error}>{errors.match_password}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          list="country_list"
          placeholder="country"
          autoComplete="country"
        />
        {errors.country && <span className={styles.error}>{errors.country}</span>}
        <datalist id="country_list">{option()}</datalist>
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
      <button className={styles.btn} type="submit">
        Submit
      </button>
    </form>
  );
}
