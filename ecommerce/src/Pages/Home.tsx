// src/pages/Home/Home.tsx
import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import Banner from '../components/Banner/Banner';
import CategoryBar from '../components/Category/CategoryBar';
import ProductCard from '../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { selectFilteredProducts, selectRecentlyViewed } from '../redux/slices/productSlice';

const Home: React.FC = () => {
  const products = useSelector(selectFilteredProducts);
  const recent = useSelector(selectRecentlyViewed);

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        {/* Hero */}
        <Banner />

        {/* Categories */}
        <Box my={3}>
          <CategoryBar />
        </Box>

        {/* Recently viewed */}
        {recent.length > 0 && (
          <>
            <Box mt={2} mb={1}>
              <Typography variant="h6">Recently viewed</Typography>
            </Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {recent.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={`recent-${p.id}`}>
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
          </>
        )}

        {/* Product grid (filtered by search/category) */}
        <Box mt={2} mb={1}>
          <Typography variant="h6">
            {products.length > 0 ? 'Products' : 'No products match your search.'}
          </Typography>
        </Box>
        {products.length > 0 && (
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
