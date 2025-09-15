import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../redux/slices/categorySlice';
import type { AppDispatch } from '../../redux/store';

const CategoryBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
  }, [categories.length, dispatch]);

  return (
    <Box className="category-bar">
      <Button variant="outlined" className="category-button" onClick={() => navigate('/')}>
        All
      </Button>

      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant="outlined"
          className="category-button"
          onClick={() => navigate(`/category/${cat.id}`)}
        >
          
          {cat.name === 'Miscellaneous' ? 'Others' : cat.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryBar;
