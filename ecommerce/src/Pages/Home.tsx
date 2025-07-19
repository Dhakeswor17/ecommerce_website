import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.items);

  return (
    <Box>
      <HeroBanner />
      <CategoryBar />
      <Typography variant="h5" fontWeight={600} mt={4} ml={2}>
        Recommended for You
      </Typography>
      <Grid container spacing={2} px={2} mt={1}>
        {products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
