// src/pages/Home/Home.tsx
import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import Banner from '../../components/Banner/Banner';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../../redux/slices/productSlice';

const Home = () => {
  const products = useSelector(selectFilteredProducts);

  return (
    <Box className="home-page" sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Banner />
        <Box my={3}>
          <CategoryBar />
        </Box>

        {products.length === 0 ? (
          <Typography>No products match your search.</Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} md={3} key={p.id}>
                <ProductCard
                  id={p.id}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  originalPrice={p.originalPrice}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
