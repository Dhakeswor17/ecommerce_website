import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, fetchProfile } from '../../redux/slices/userSlice';
import type { AppDispatch } from '../../redux/store';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((s: any) => s.user.loading);
  const error = useSelector((s: any) => s.user.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const res = await dispatch(login({ email, password }));
    const token = (res as any)?.payload?.access_token;
    if (token) {
      await dispatch(fetchProfile(token));
      navigate('/'); 
    }
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Login'}
          </Button>

        
          <Typography sx={{ mt: 2 }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" color="primary">
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
