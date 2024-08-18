import { SerializeUserData } from '@/app/features/submit-form';

export default function Card(user: SerializeUserData) {
  const { image, age, name, country, email, gender, password } = user;
  return (
    <>
      <img src={image} alt={name} width="200" height="200" />
      <div>
        <h3>
          Name: <strong>{name}</strong>
        </h3>
        <div>
          Age: <strong>{age}</strong>
        </div>
        <div>
          Country: <strong>{country}</strong>
        </div>
        <div>
          Email: <strong>{email}</strong>
        </div>
        <div>
          Password: <strong>{password}</strong>
        </div>
        <div>
          Gender: <strong>{gender}</strong>
        </div>
      </div>
    </>
  );
}
