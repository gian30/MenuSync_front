import React, { useState } from 'react';
import { Box, Typography, Stack, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const menuItems = [
  {
    id: '1',
    itemName: 'Maguro Maki',
    description: 'optional',
    photoLinks: ['Link to photo 1', 'Link to photo 2', 'Link to photo 3'],
    category: 'Example 2',
    price: '400',
    tag: "Chef's Special",
    grams: '150',
    calories: '350',
    proteins: '50',
    fats: '50',
    carbohydrates: '50',
    stopList: 'Sold Out',
    eighteenPlus: 'Yes',
    recommendedItemIds: '4',
    available: true
  },
  {
    id: '2',
    itemName: 'Greek Salad',
    description: '',
    photoLinks: ['Link to photo 1', 'Link to photo 2', 'Link to photo 3'],
    category: 'Example 3',
    price: '500',
    tag: 'Vegan',
    grams: '250',
    calories: '250',
    proteins: '60',
    fats: '10',
    carbohydrates: '80',
    stopList: 'Available',
    eighteenPlus: 'No',
    recommendedItemIds: '',
    available: false
  },
  // Add more menu items here...
];

const allTags = menuItems.reduce((tags, item) => {
  if (item.tag && !tags.includes(item.tag)) {
    return [...tags, item.tag];
  }
  return tags;
}, []);

function MenuCard({ item }) {
  const { itemName, available, price, photoLinks } = item;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={photoLinks[0]} alt={itemName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
        <Box>
          <Typography variant="body1">{itemName}</Typography>
          <Typography variant="body2">Price: ${price}</Typography>
          <Typography variant="body2">{available ? 'Available' : 'Unavailable'}</Typography>
        </Box>
      </Box>
      <Button variant="contained" disabled={!available}>
        {available ? 'Add to Cart' : 'Unavailable'}
      </Button>
    </Box>
  );
}

function App() {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const filteredItems = menuItems.filter((item) =>
    selectedTags.length === 0 ? true : selectedTags.some((tag) => item.tag === tag)
  );

  const groupedItemsByCategory = filteredItems.reduce((groups, item) => {
    const { category } = item;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <Box sx={{ display: 'flex', padding: 4 }}>
      <Stack direction="column" spacing={2} sx={{ width: '200px', marginRight: 4 }}>
        <Typography variant="h5">Filter by Tag</Typography>
        <Stack spacing={1}>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? 'contained' : 'outlined'}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {Object.entries(groupedItemsByCategory).map(([category, items]) => (
          <Box key={category} sx={{ marginBottom: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>{category}</Typography>
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </Box>
        ))}
      </Box>
      <IconButton aria-label="Cart" color="primary">
        <Badge badgeContent={4} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
}

export default App;
