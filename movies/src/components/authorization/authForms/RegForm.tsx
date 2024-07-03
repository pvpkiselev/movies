import React, { useState } from 'react';
import styles from './Form.module.scss';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/buttons/button/Button';

interface RegFormProps {
  onSwitch: () => void;
}

export default function RegForm({ onSwitch }: RegFormProps) {
  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { userName, email, password } = credentials;

    console.log(
      `Пользователь успешно зарегистрирован\n Логин: ${userName}\n Email: ${email}\n Пароль: ${password}`
    );

    setCredentials({ userName: '', email: '', password: '' });

    onSwitch();
  };

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} action="">
      <h2 className={styles.title}>Registration Form</h2>
      <div className={styles.inputsBlock}>
        <Input
          name="userName"
          type="text"
          placeholder="Username"
          value={credentials.userName}
          onChange={handleCredentialsChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
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
        Register
      </Button>
      <Button size="small" appearance="tertiary" type="button" onClick={onSwitch}>
        Switch to Login
      </Button>
    </form>
  );
}
