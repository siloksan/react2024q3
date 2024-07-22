import { useTheme } from '@/app/providers/themeProvider';
import styles from './Button.module.scss';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  additionalStyles?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  additionalStyles = '',
  type = 'button',
  disabled = false,
  ...props
}: Props) {
  const dark = useTheme();

  let className = styles.button;

  if (additionalStyles) {
    className += ` ${additionalStyles}`;
  }

  if (dark) {
    className += ` ${styles.dark}`;
  }

  return (
    <button type={type} className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
