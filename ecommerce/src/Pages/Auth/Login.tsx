import React from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => navigate('/')}
          >
            Login
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
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