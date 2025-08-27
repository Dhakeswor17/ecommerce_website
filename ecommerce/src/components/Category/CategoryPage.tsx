import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/slices/productSlice';
import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';

const CategoryPage = () => {
  const { name } = useParams();
  const products = useSelector(selectProducts);
  const list = products.filter(p => (p.category || '').toLowerCase() === (name || '').toLowerCase());

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {name} {name ? 'Products' : ''}
        </Typography>
        {list.length === 0 ? (
          <Typography>No products in this category.</Typography>
        ) : (
          <Grid container spacing={3}>
            {list.map(p => (
              < item xs={12} sm={6} md={3} key={p.id}>
                <ProductCard
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  originalPrice={p.originalPrice}
                />>
              
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
