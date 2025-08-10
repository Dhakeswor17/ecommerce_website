import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register -> login
    dispatch(loginSuccess({
      id: 'u_2',
      name: name || (email.split('@')[0] ?? 'User'),
      email,
      token: 'mock-jwt-token'
    }));
    navigate('/'); // go home after register
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Register</Typography>
        <Box component="form" noValidate onSubmit={handleRegister}>
          <TextField fullWidth label="Full Name" margin="normal" value={name}
            onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" type="email" margin="normal" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={pwd}
            onChange={(e) => setPwd(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Create Account
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" color="primary">Login</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
