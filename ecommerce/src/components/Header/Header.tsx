// src/components/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';
import { setSearch, selectSearch } from '../../redux/slices/productSlice';
import { selectWishlistIds } from '../../redux/slices/wishlistSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useSelector((s: RootState) => s.user.user);
  const wishCount = useSelector((s: RootState) => selectWishlistIds(s).length);
  const search = useSelector(selectSearch);
  const [localQ, setLocalQ] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setSearch(localQ));
    }, 300);
    return () => clearTimeout(t);
  }, [localQ, dispatch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(localQ));
    // If you want explicit navigation to home on submit, uncomment:
    // navigate('/');
  };

  return (
    <AppBar position="static" color="transparent" sx={{ backgroundColor: '#1f1f1f' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 0, color: '#fff', cursor: 'pointer' }} onClick={() => navigate('/')}>
          TEMUDARK
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{
          display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: 560,
          backgroundColor: '#333', borderRadius: 1, px: 1
        }}>
          <InputBase
            placeholder="Search products…"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            sx={{ flex: 1, color: '#fff', py: 0.5 }}
          />
        </Box>

        {user ? (
          <Typography onClick={() => dispatch(logout())} sx={{ cursor: 'pointer', mr: 1 }}>
            Logout
          </Typography>
        ) : (
          <Typography onClick={() => navigate('/login')} sx={{ cursor: 'pointer', mr: 1 }}>
            Login
          </Typography>
        )}

        <IconButton color="inherit" onClick={() => navigate('/wishlist')}>
          <Badge badgeContent={wishCount} color="error">
            <FavoriteIcon sx={{ color: '#fff' }} />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={totalQuantity} color="error">
            <ShoppingCartIcon sx={{ color: '#fff' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;