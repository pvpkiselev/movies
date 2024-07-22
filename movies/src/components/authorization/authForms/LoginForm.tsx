import React, { useState } from 'react';
import styles from './Form.module.scss';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/buttons/Button';

interface LoginFormProps {
  onSwitch: () => void;
  onLogin: () => void;
}

export default function LoginForm({ onSwitch, onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { userName, password } = credentials;

    console.log(
      `Пользователь успешно авторизован\n Логин: ${userName}\n Пароль: ${password}`
    );

    setCredentials({ userName: '', password: '' });

    onLogin();
  };

  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} action="">
      <h2 className={styles.title}>Login Form</h2>
      <div className={styles.inputsBlock}>
        <Input
          name="userName"
          type="text"
          placeholder="Username"
          value={credentials.userName}
          onChange={handleCredentialsChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleCredentialsChange}
        />
      </div>
      <Button size="medium" appearance="primary" type="submit">
        Login
      </Button>
      <Button
        size="small"
        appearance="tertiary"
        type="button"
        onClick={onSwitch}
      >
        Switch to Registration
      </Button>
    </form>
  );
}
