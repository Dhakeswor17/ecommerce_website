
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { Box, Typography, Container, Grid, Button, IconButton, TextField, Snackbar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const [snackMsg, setSnackMsg] = useState<string | null>(null);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
      setSnackMsg('Quantity updated');
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    setSnackMsg('Item removed');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
      <Container>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={2}
                  sx={{ p: 2, bgcolor: '#1f1f1f', borderRadius: 2 }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      style={{ borderRadius: 8, objectFit: 'cover' }}
                    />
                    <Box>
                      <Typography variant="subtitle1" noWrap maxWidth={260}>{item.title}</Typography>
                      <Typography>${item.price.toFixed(2)}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value || '1', 10))}
                      inputProps={{ min: 1 }}
                      size="small"
                      sx={{ width: 80, input: { color: '#fff' } }}
                    />
                    <IconButton onClick={() => handleRemove(item.id)} color="error" aria-label="Remove">
                      <DeleteIcon />
                    </IconButton>
                    <Button onClick={() => handleRemove(item.id)} color="error" variant="text">
                      Remove
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box textAlign="right">
                <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/checkout">
                  Proceed to Checkout
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>

      <Snackbar
        open={!!snackMsg}
        autoHideDuration={2000}
        onClose={() => setSnackMsg(null)}
        message={snackMsg ?? ''}
      />
    </Box>
  );
};

export default Cart;