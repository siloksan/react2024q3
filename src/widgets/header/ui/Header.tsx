import Payload from 'shared/api/types/apiTypes';
import styles from './Header.module.scss';
import logo from '../assets/startrek-logo.png';
import SearchBox from '../components/search/SearchBox';
import ErrorButton from '../components/errorButton/ErrorButton';

interface Props {
  updateData: (payload: Payload) => void;
}

export default function Header({ updateData }: Props) {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Star trek logo" />
      </div>
      <SearchBox updateData={updateData} />
      <ErrorButton />
    </header>
  );
}
