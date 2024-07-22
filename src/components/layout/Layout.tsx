import Header from "../header";

// import { useTheme } from 'app/providers/themeProvider';
// import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  // const dark = useTheme();

  // let rootClass = styles.root;
  // if (dark) {
  //   rootClass += ` ${styles.dark}`;
  // }

  return (
    <div>
      {/* <h2>Header</h2> */}
      <Header />
        {children}
    </div>
  );
}
