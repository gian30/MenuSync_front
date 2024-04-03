import { Stack, Button } from '@mui/material';
import React from 'react';

function BottomBar({ categories }) {

    const scrollToCategory = (category) => {
        // Find the element corresponding to the clicked category
	
        const categoryElement = document.getElementById(category.replace(/\s+/g, '-').toLowerCase());
        if (categoryElement) {
            // Scroll to the category element
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Stack direction="row" spacing={2} sx={{
            position: 'fixed',
            bottom: '10px',
            left: '50%', // Center align horizontally
            transform: 'translateX(-50%)', // Center align horizontally
            padding: '5px',
            backgroundColor: '#fff',
            borderRadius: '20px', // Rounded corners
            border: '1px solid #ccc', // Border
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {categories.map((category, index) => (
                <Button
                    key={category}
                    variant="outlined"
                    sx={{
                        // Styling for individual button
                        backgroundColor: '#fff',
                        borderRadius: '20px', // Rounded corners for buttons
                        color: '#363636',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        whiteSpace: 'nowrap', // Prevent text wrapping
                    }}
                    onClick={() => scrollToCategory(category)}
                >
                    {category}
                </Button>
            ))}
        </Stack>
    );
}

export default BottomBar;
