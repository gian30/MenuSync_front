import React from 'react';
import { Box, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ShoppingCartButton({ totalQuantity, onClick }) {
  return (
    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 2 }}>
      <IconButton
        aria-label="Cart"
        color="primary"
        sx={{ borderRadius: '50%', backgroundColor: '#fff', padding: '10px' }}
        onClick={onClick}
      >
        {/* Display total quantity in the cart */}
        <Badge badgeContent={totalQuantity} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
}

export default ShoppingCartButton;
