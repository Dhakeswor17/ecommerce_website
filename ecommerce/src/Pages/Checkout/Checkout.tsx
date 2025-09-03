import { Box, Container, Typography, Grid, TextField, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
      <Container>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        <Grid container spacing={4}>
          {/* Shipping Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField fullWidth label="Full Name" margin="normal" variant="outlined" />
              <TextField fullWidth label="Address Line 1" margin="normal" variant="outlined" />
              <TextField fullWidth label="Address Line 2" margin="normal" variant="outlined" />
              <TextField fullWidth label="City" margin="normal" variant="outlined" />
              <TextField fullWidth label="Postal Code" margin="normal" variant="outlined" />
              <TextField fullWidth label="Country" margin="normal" variant="outlined" />
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            {cartItems.map((item, idx) => (
              <Box key={idx} display="flex" justifyContent="space-between" my={1}>
                <Typography>{item.title} x {item.quantity}</Typography>
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2, borderColor: '#444' }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;


