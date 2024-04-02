import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function App() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const allTags = menuItems.reduce((tags, item) => {
        if (item.tag && !tags.includes(item.tag)) {
            return [...tags, item.tag];
        }
        return tags;
    }, []);

    useEffect(() => {
        fetch('https://menusync-back-82af2f8cc329.herokuapp.com/')
            .then(response => response.json())
            .then(data => {
                setMenuItems(data.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching menu items:', error));
    }, []);

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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: { xs: '10px', md: '20px' },
        }}>
            {loading ? (
                <Typography variant="h4">Loading...</Typography>
            ) : (
                <>
                    <Stack direction={{ xs: 'row', md: 'column' }} spacing={2} sx={{ width: '100%', marginBottom: '20px' }}>
                        <Typography variant="h5">Filter by Tag</Typography>
                        <Stack spacing={1} direction={{ xs: 'row', md: 'column' }}>
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
                    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                        <IconButton aria-label="Cart" color="primary">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
}

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

export default App;
