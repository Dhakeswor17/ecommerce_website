import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth success
    dispatch(loginSuccess({
      id: 'u_1',
      name: email.split('@')[0] || 'User',
      email,
      token: 'mock-jwt-token'
    }));
    navigate('/checkout'); // go to checkout after login
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" noValidate onSubmit={handleLogin}>
          <TextField fullWidth label="Email" type="email" margin="normal" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" color="primary">Register</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
