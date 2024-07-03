import styles from './Input.module.scss';

interface InputProps {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  name: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  name,
  placeholder,
  autoComplete = 'on',
  required = true,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
}
