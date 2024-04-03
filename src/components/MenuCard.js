import { Box, Button, Typography, Slider } from '@mui/material';
import React, { useState } from 'react';

function MenuCard({ item }) {
  const { itemName, description, available, price, photoLinks } = item;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (event, newValue) => {
    setCurrentImageIndex(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: '16px',
        border: '1px solid #ccc',
        padding: '16px',
      }}
    >
      <Box sx={{ marginBottom: '16px' }}>
        <Box sx={{ position: 'relative', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
          <img
            src={photoLinks[currentImageIndex]}
            alt={itemName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {photoLinks.length > 1 && (
            <Box sx={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', width: '80%' }}>
              <Slider
                value={currentImageIndex}
                onChange={handleImageChange}
                min={0}
                max={photoLinks.length - 1}
                step={1}
                aria-labelledby="image-slider"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>{itemName}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>{description}</Typography>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>Price: ${price}</Typography>
        <Button variant="contained" disabled={!available} sx={{ marginBottom: '8px' }}>
          {available ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </Box>
    </Box>
  );
}

export default MenuCard;
