
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { Box, Typography, Container, Grid, Button, IconButton, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
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
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="#1f1f1f" borderRadius={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <img src={item.image} alt={item.title} width={80} height={80} style={{ borderRadius: '8px' }} />
                    <Box>
                      <Typography variant="subtitle1" noWrap>{item.title}</Typography>
                      <Typography>${item.price.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value || '1', 10))}
                      inputProps={{ min: 1 }}
                      size="small"
                      sx={{ width: '70px', input: { color: '#fff' } }}
                    />
                    <IconButton onClick={() => handleRemove(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
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
