import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { AppDispatch } from '../../redux/store';
import { clearProducts, fetchProducts } from '../../redux/slices/productSlice';
import { selectCategories } from '../../redux/slices/categorySlice';

const CategoryPage: React.FC = () => {
  const { id } = useParams();               // /category/:id
  const categoryId = Number(id);
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((s: any) => s.products.items);
  const loading = useSelector((s: any) => s.products.loading);
  const totalLoaded = useSelector((s: any) => s.products.totalLoaded);
  const search = useSelector((s: any) => s.products.search);
  const categories = useSelector(selectCategories);
  const category = categories.find((c) => c.id === categoryId);

  // Load first page whenever category or search changes
  useEffect(() => {
    if (!categoryId) return;
    dispatch(clearProducts());
    dispatch(
      fetchProducts({
        offset: 0,
        limit: 20,
        categoryId,
        title: search || undefined, // supports in-category searching
      })
    );
  }, [dispatch, categoryId, search]);

  const loadMore = () => {
    dispatch(
      fetchProducts({
        offset: totalLoaded,
        limit: 20,
        categoryId,
        title: search || undefined,
      })
    );
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {category ? (category.name === 'Miscellaneous' ? 'Others' : category.name) : 'Category'} Products
        </Typography>

        <Grid container spacing={3}>
          {items.map((p: any) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <ProductCard
                id={p.id}
                image={p.images?.[0] || 'https://via.placeholder.com/300x200'}
                title={p.title}
                price={p.price}
              />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" onClick={loadMore}>Load more</Button>
          )}
        </Box>

        {!loading && items.length === 0 && (
          <Typography sx={{ mt: 2 }}>No products found for this category.</Typography>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;