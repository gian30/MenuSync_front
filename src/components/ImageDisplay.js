import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function ImageDisplay({ photoLinks }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photoLinks.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photoLinks.length) % photoLinks.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextImage, 3000);
        return () => clearInterval(intervalId);
    }, [currentImageIndex]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleImageError = () => {
        setLoading(false);
        // Handle image load error here
    };

    return (
        <Box sx={{ position: 'relative', height: '300px', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
            {photoLinks.map((link, index) => (
                <img
                    key={index}
                    src={link}
                    alt="Menu Item"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        transition: 'opacity 0.5s ease-in-out',
                        opacity: currentImageIndex === index ? 1 : 0,
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            ))}
            {photoLinks.length > 1 && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={prevImage} disabled={loading} sx={{ minWidth: 'auto' }}>
                        <ChevronLeft />
                    </Button>
                    <Button onClick={nextImage} disabled={loading} sx={{ minWidth: 'auto' }}>
                        <ChevronRight />
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default ImageDisplay;
