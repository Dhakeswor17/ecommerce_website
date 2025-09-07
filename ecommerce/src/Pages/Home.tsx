
import React, { useEffect } from 'react';
import { Grid, Container, Box, Typography, Button, CircularProgress } from '@mui/material'
import Banner from '../components/Banner/Banner';
import CategoryBar from '../components/Category/CategoryBar';
import ProductCard from '../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { fetchProducts, selectFilteredProducts } from '../redux/slices/productSlice';


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((s: any) => s.products.items);
  const loading = useSelector((s: any) => s.products.loading);
  const totalLoaded = useSelector((s: any) => s.products.totalLoaded);
  const search = useSelector((s: any) => s.products.search);

  useEffect(() => {
    // when search changes, reload from offset 0 using API ?title=
    dispatch(clearProducts());
    dispatch(fetchProducts({ offset: 0, limit: 20, title: search || undefined }));
  }, [dispatch, search]);

  const loadMore = () => {
    dispatch(fetchProducts({ offset: totalLoaded, limit: 20, title: search || undefined }));
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Banner />
        <Box my={3}><CategoryBar /></Box>

        <Box mt={2} mb={1}>
          <Typography variant="h6">
            {products.length > 0 ? 'Products' : (loading ? 'Loading…' : 'No products match your search.')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {products.map((p: any) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <ProductCard
                id={p.id} // pass number (see card fix below)
                image={p.images?.[0] || 'https://via.placeholder.com/300x200'}
                title={p.title}
                price={p.price}
              />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={3}>
          {loading ? <CircularProgress /> : <Button variant="outlined" onClick={loadMore}>Load more</Button>}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
