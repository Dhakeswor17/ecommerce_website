import React from 'react';
import { Box, Grid, Typography, Button, Container, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((s: RootState) => selectProductById(s as any, id || ''));

  const [snack, setSnack] = React.useState(false);

  if (!product) {
    return (
      <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
        <Container>
          <Typography variant="h5">Product not found.</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '10px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}{' '}
              {product.originalPrice && (
                <span style={{ textDecoration: 'line-through', color: '#aaa', marginLeft: 10 }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </Typography>
            <Typography variant="body1" paragraph>
              Great value product with excellent features.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }));
                setSnack(true);
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snack} autoHideDuration={2000} onClose={() => setSnack(false)} message="Added to cart" />
    </Box>
  );
};

export default ProductDetail;
