// src/components/CategoryBar/CategoryBar.tsx

import { Box, Button } from '@mui/material';
import './CategoryBar.scss';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/productSlice';

const categories = ['All', 'Electronics', 'Fitness', 'Home', 'Beauty', 'Toys', 'Books'];

const CategoryBar = () => {
  const dispatch = useDispatch();
  const onCat = (c: string) => dispatch(setSearch(c === 'All' ? '' : c));

  return (
    <Box className="category-bar">
      {categories.map((cat) => (
        <Button key={cat} variant="outlined" className="category-button" onClick={() => onCat(cat)}>
          {cat}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryBar;
