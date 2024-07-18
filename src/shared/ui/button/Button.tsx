import styles from './Button.module.scss';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  additionalStyles?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, additionalStyles, type, disabled, ...props }: Props) {
  let className = styles.button;

  if (additionalStyles) {
    className += ` ${additionalStyles}`;
  }

  return (
    <button type={type} className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  additionalStyles: '',
  type: 'button',
};
