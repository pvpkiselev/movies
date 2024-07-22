import React from 'react';
import styles from './ErrorField.module.scss';

type ErrorFieldProps = {
  message: string;
};

const ErrorField = ({ message }: ErrorFieldProps) => {
  if (!message) return null;

  return <div className={styles.errorField}>{message}</div>;
};

export default ErrorField;
