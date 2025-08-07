import React from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Register</Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
          />
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
            Register
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" color="primary">
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;