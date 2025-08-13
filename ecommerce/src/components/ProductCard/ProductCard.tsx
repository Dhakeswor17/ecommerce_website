// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import './ProductCard.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, originalPrice }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 1 }));
  };

  return (
    <Card className="product-card">
      <CardMedia component="img" image={image} alt={title} className="product-image" />
      <CardContent>
        <Typography variant="subtitle1" className="product-title" noWrap title={title}>
          {title}
        </Typography>
        <Typography variant="h6" className="product-price">
          ${price.toFixed(2)}{' '}
          {originalPrice && <span className="original-price">${originalPrice.toFixed(2)}</span>}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color="primary" onClick={handleAdd}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
