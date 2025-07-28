import React from 'react';
import { Grid, Container, Box } from '@mui/material';
import Banner from '../components/Banner/Banner';
import CategoryBar from '../components/CategoryBar/CategoryBar';
import ProductCard from '../components/ProductCard/ProductCard';

const demoProducts = [
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Smartphone XYZ',
    price: 299.99,
    originalPrice: 399.99,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Wireless Headphones',
    price: 99.99,
    originalPrice: 129.99,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Fitness Tracker',
    price: 59.99,
    originalPrice: 89.99,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Smart TV 50"',
    price: 499.99,
    originalPrice: 599.99,
  },
];

const Home = () => {
  return (
    <Box className="home-page" sx={{ backgroundColor: '#121212', color: '#fff', py: 4 }}>
      <Container>
        <Banner />
        <Box my={3}>
          <CategoryBar />
        </Box>
        <Grid container spacing={3}>
          {demoProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;