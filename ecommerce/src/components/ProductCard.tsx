import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import './ProductCard.scss';

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, originalPrice }) => {
  return (
    <Card className="product-card">
      <CardMedia component="img" image={image} alt={title} className="product-image" />
      <CardContent>
        <Typography variant="subtitle1" className="product-title">
          {title}
        </Typography>
        <Typography variant="h6" className="product-price">
          ${price.toFixed(2)}{' '}
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
       
  );
};

export default ProductCard;