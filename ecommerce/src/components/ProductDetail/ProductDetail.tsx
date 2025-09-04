import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Container, Snackbar, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, fetchProductById, addRecentlyViewed } from '../../redux/slices/productSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((s: RootState) => selectProductById(s as any, productId));
  const [snack, setSnack] = useState(false);
  const loading = useSelector((s: any) => s.products.loading);

  useEffect(() => {
    if (!product && productId) dispatch(fetchProductById(productId));
  }, [dispatch, productId, product]);

  useEffect(() => {
    if (product?.id) dispatch(addRecentlyViewed(product.id));
  }, [dispatch, product?.id]);

  if (!product && loading) {
    return <Box sx={{ color: '#fff', p: 6, textAlign: 'center' }}><CircularProgress /></Box>;
  }
  if (!product) {
    return <Box sx={{ color: '#fff', p: 6 }}><Container><Typography>Product not found.</Typography></Container></Box>;
  }

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img src={product.images?.[0] || 'https://via.placeholder.com/600x400'} alt={product.title} style={{ width: '100%', borderRadius: '10px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="h5" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
            <Typography variant="body1" paragraph>{product.description || '—'}</Typography>
            <Button
              variant="contained" color="primary" size="large"
              onClick={() => { dispatch(addToCart({ id: product.id.toString(), title: product.title, price: product.price, image: product.images?.[0] || '', quantity: 1 })); setSnack(true); }}
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
