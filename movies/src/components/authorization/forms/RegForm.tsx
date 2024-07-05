import React, { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';

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
    <Stack component="form" onSubmit={handleSubmit} spacing={4}>
      <Typography variant="h5" gutterBottom>
        Registration Form
      </Typography>
      <TextField
        name="userName"
        type="text"
        label="Username"
        value={credentials.userName}
        onChange={handleCredentialsChange}
        fullWidth
      />
      <TextField
        name="email"
        type="email"
        label="Email"
        value={credentials.email}
        onChange={handleCredentialsChange}
        fullWidth
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        value={credentials.password}
        onChange={handleCredentialsChange}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        type="submit"
        disableElevation
        fullWidth
      >
        Register
      </Button>
      <Button variant="text" size="large" color="secondary" onClick={onSwitch} fullWidth>
        Switch to Login
      </Button>
    </Stack>
  );
}
