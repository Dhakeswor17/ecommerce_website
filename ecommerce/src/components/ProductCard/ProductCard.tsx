import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography,
  CardActions, Button, CardActionArea, Snackbar
} from '@mui/material';
import './ProductCard.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, originalPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 1 }));
    setOpenSnack(true);
  };

  return (
    <>
      <Card className="product-card">
        <CardActionArea onClick={() => navigate(`/product/${id}`)}>
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
        </CardActionArea>
        <CardActions>
          <Button fullWidth variant="contained" color="primary" onClick={handleAdd}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={2000}
        message="Added to cart"
      />
    </>
  );
};

export default ProductCard;
