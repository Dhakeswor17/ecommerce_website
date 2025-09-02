import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography,
  CardActions, Button, CardActionArea, Snackbar, IconButton, Box
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../ProductCard/ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist, selectWishlistIds } from '../../redux/slices/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';

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
  const [openSnack, setOpenSnack] = useState<string | null>(null);
  const wishlistIds = useSelector((s: RootState) => selectWishlistIds(s));
  const wished = wishlistIds.includes(id);

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 1 }));
    setOpenSnack('Added to cart');
  };

  const handleToggleWish = (e: React.MouseEvent) => {
    e.stopPropagation(); // don't trigger card click
    dispatch(toggleWishlist(id));
    setOpenSnack(wished ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  return (
    <>
      <Card className="product-card">
        <CardActionArea onClick={() => navigate(`/product/${id}`)}>
          <Box position="relative">
            <CardMedia component="img" image={image} alt={title} className="product-image" />
            <IconButton
              onClick={handleToggleWish}
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: '#00000066', '&:hover': { bgcolor: '#00000099' } }}
            >
              {wished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{ color: '#fff' }} />}
            </IconButton>
          </Box>
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
        open={!!openSnack}
        onClose={() => setOpenSnack(null)}
        autoHideDuration={1800}
        message={openSnack ?? ''}
      />
    </>
  );
};

export default ProductCard;
