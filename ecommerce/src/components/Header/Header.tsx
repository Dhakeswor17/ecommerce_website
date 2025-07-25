import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Badge } from '@mui/material';
import { ShoppingCart, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <AppBar position="sticky" color="default" className="header">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="logo">
          <Link to="/">TemuDark</Link>
        </Typography>

        <Box className="searchBox">
          <InputBase placeholder="Search products..." className="searchInput" />
          <IconButton type="submit">
            <Search style={{ color: '#fff' }} />
          </IconButton>
        </Box>

        <IconButton component={Link} to="/cart">
          <Badge badgeContent={2} color="primary">
            <ShoppingCart style={{ color: '#fff' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;