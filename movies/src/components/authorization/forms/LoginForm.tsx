import React, { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';

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

    console.log(`Пользователь успешно авторизован\n Логин: ${userName}\n Пароль: ${password}`);

    setCredentials({ userName: '', password: '' });

    onLogin();
  };

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={4}>
      <Typography variant="h5" gutterBottom>
        Login Form
      </Typography>
      <TextField
        name="userName"
        type="text"
        label="Username"
        value={credentials.userName}
        onChange={handleCredentialsChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        value={credentials.password}
        onChange={handleCredentialsChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        type="submit"
        disableElevation
        fullWidth
      >
        Login
      </Button>
      <Button variant="text" size="large" color="secondary" onClick={onSwitch} fullWidth>
        Switch to Registration
      </Button>
    </Stack>
  );
}
