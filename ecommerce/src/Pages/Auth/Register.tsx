
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { login, fetchProfile } from '../../redux/slices/userSlice';
import api from '../../Services/api'; 

async function registerUser(payload: { name: string; email: string; password: string; avatar?: string }) {
  const { data } = await api.post('/users', payload);
  return data;
}

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('newuser@mail.com');
  const [password, setPassword] = useState('changeme');
  const loading = useSelector((s: any) => s.user.loading);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser({
        name,
        email,
        password,
        // avatar is optional in the API; you can add one if you like
      });

      const res = await dispatch(login({ email, password }));
      const token: string | undefined = (res as any)?.payload?.access_token;

      if (token) {
        await dispatch(fetchProfile(token));
        navigate('/'); // or /checkout
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Registration failed');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" noValidate onSubmit={handleRegister}>
          <TextField fullWidth label="Full Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MuiLink component={RouterLink} to="/login" color="primary">
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
