// import { yupResolver } from '@hookform/resolvers/yup';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { createRef, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { RootState } from '@/app/store';
// import { schema, type FormData } from '@/utils/validate-schema';
// import { submitForm } from '@/app/features/submit-form';

// import styles from './uncontrolled-form.module.scss';

// function getValue(ref: React.RefObject<HTMLFormElement>, fieldId) {
//   if (!ref.current) return '';
//   const field = ref.current.elements[fieldId];
//   if (field instanceof HTMLInputElement) return field.value;
// }

// export default function UncontrolledForm() {
//   const navigate = useNavigate();
//   const [county, setCountry] = useState('');
//   const dispatch = useDispatch();
//   const ref = createRef<HTMLFormElement>();

//   const countries = useSelector((state: RootState) => state.countries.value);
//   const onSubmitHandler = () => {
//     const data = new FormData(ref.current);
//     if (data.image instanceof FileList && data.image[0]) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           const serializeData = { ...data, image: reader.result.toString(), id: new Date().getTime() };
//           dispatch(submitForm(serializeData));
//         }
//       };
//       reader.readAsDataURL(data.image[0]);
//     }
//     navigate('/');
//   };

//   const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     setCountry(event.target.value);
//   };

//   const dropdown = () => {
//     return countries
//       .filter((item: string) => item.includes(county) && item !== county && county !== '')
//       .map((item: string) => {
//         return (
//           <li key={item} onClick={() => setCountry(item)} aria-hidden="true">
//             {item}
//           </li>
//         );
//       });
//   };

//   return (
//     <form className={styles.container} ref={ref}>
//       <h2 className={styles.title}>Uncontrolled Form</h2>
//       <div className={styles.field}>
//         <label htmlFor="name">Name</label>
//         <input id="name" placeholder="name" type="text" autoComplete="given-name" />
//         {/* {errors.name && <span className={styles.error}>{errors.name.message}</span>} */}
//       </div>
//       <div className={styles.field}>
//         <label htmlFor="age">Age</label>
//         <input id="age" type="number" min={0} />
//         {/* {errors.age && <span className={styles.error}>{errors.age.message}</span>} */}
//       </div>
//       <div className={styles.field}>
//         <label htmlFor="email">Email</label>
//         <input id="email" placeholder="email" type="email" autoComplete="email" />
//         {/* {errors.email && <span className={styles.error}>{errors.email.message}</span>} */}
//       </div>
//       <div className={styles.field}>
//         <label htmlFor="password">Password</label>
//         <input id="password" placeholder="password" type="password" autoComplete="current-password" />
//         {/* {errors.password && <span className={styles.error}>{errors.password.message}</span>} */}
//       </div>
//       <div className={styles.field}>
//         <label htmlFor="country">Country</label>
//         <input
//           id="country"
//           type="text"
//           placeholder="country"
//           value={county}
//           onChange={onChange}
//           autoComplete="country"
//         />
//         {/* {errors.country && <span className={styles.error}>{errors.country.message}</span>} */}
//         <div className={styles.dropdownContainer}>
//           <ul className={styles.dropdown}>{dropdown()}</ul>
//         </div>
//       </div>
//       <fieldset className={styles.field}>
//         <legend>Your Gender:</legend>
//         <div className={styles.radio}>
//           <div>
//             <input id="gender_male" type="radio" value="male" />
//             <label htmlFor="gender_male">Male</label>
//           </div>
//           <div>
//             <input id="gender_female" type="radio" value="female" />
//             <label htmlFor="gender_female">Female</label>
//           </div>
//         </div>
//         {/* {errors.gender && <span className={styles.error}>{errors.gender.message}</span>} */}
//       </fieldset>
//       <div className={styles.field}>
//         <label htmlFor="image">Upload your avatar</label>
//         <input id="image" type="file" accept="image/png, image/jpeg" />
//         {/* {errors.image && <span className={styles.error}>{errors.image.message}</span>} */}
//       </div>
//       <div className={`${styles.field} ${styles.condition}`}>
//         <input id="condition" placeholder="condition" type="checkbox" />
//         <label htmlFor="condition">I accept the terms and conditions</label>
//       </div>
//       {/* {errors.condition && <span className={styles.error}>{errors.condition.message}</span>} */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
