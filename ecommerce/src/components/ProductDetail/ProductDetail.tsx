import React from 'react';
import { Box, Grid, Typography, Button, Container } from '@mui/material';

const ProductDetail = () => {
  const product = {
    title: 'Smartphone XYZ',
    image: 'https://via.placeholder.com/500x400',
    price: 299.99,
    originalPrice: 399.99,
    description: 'This is a high-end smartphone with the latest features and excellent performance.',
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 5 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '10px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}{' '}
              <span style={{ textDecoration: 'line-through', color: '#aaa', marginLeft: '10px' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;