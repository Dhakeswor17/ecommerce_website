import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { AppDispatch } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchCategories, selectCategories } from '../../redux/slices/categorySlice';

const CategoryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const loading = useSelector((s: any) => s.products.loading);
  const items = useSelector((s: any) => s.products.items);
  const totalLoaded = useSelector((s: any) => s.products.totalLoaded);

  // ensure categories loaded
  useEffect(() => { if (!categories.length) dispatch(fetchCategories()); }, [categories.length, dispatch]);

  const category = useMemo(
    () => categories.find(c => c.name.toLowerCase() === (name || '').toLowerCase()),
    [categories, name]
  );

  useEffect(() => {
    dispatch({ type: 'products/clearProducts' });
    if (category) {
      dispatch(fetchProducts({ offset: 0, limit: 20, categoryId: category.id }));
    }
  }, [dispatch, category?.id]);

  const loadMore = () => {
    if (category) dispatch(fetchProducts({ offset: totalLoaded, limit: 20, categoryId: category.id }));
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>{name} Products</Typography>

        {!category ? (
          <Typography>Category not found.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {items.map((p: any) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
                  <ProductCard
                    id={p.id.toString()}
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
          </>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
