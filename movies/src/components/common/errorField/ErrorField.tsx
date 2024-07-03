import styles from './ErrorField.module.scss';

interface ErrorFieldProps {
  message: string;
}

const ErrorField = ({ message }: ErrorFieldProps) => {
  if (!message) return null;

  return <div className={styles.errorField}>{message}</div>;
};

export default ErrorField;
