import React, { useState } from 'react';
import { Box, Button, Typography, MenuItem, Select } from '@mui/material';
import { connect } from 'react-redux';
import { addToCart, updateCartItemQuantity } from '../store/actions/cartActions';

function ItemInfo({ item, addToCart, updateCartItemQuantity }) {
    const { id, itemName, description, available, price } = item;
    const [quantity, setQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        console.log(item, id);
        addToCart(item);
        setQuantity(1);
        setAddedToCart(true);
        updateCartItemQuantity(id, 1);
    };

    const handleChangeQuantity = (e) => {
        const newQuantity = e.target.value;
        if (newQuantity === 0) {
            removeFromCart();
        } else {
            setQuantity(newQuantity);
            updateCartItemQuantity(id, newQuantity);
        }
    };

    const removeFromCart = () => {
        setAddedToCart(false);
        setQuantity(0);
        updateCartItemQuantity(id, 0);
    };

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ marginBottom: '8px' }}>{itemName}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>{description}</Typography>
            <Typography variant="body2" sx={{ marginBottom: '8px' }}>Price: ${price}</Typography>
            {addedToCart ? (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ marginRight: '8px' }}>Quantity:</Typography>
                    <Select
                        value={quantity}
                        onChange={handleChangeQuantity}
                    >
                        {[...Array(11).keys()].map((value) => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </Box>
            ) : (
                <Button
                    variant="outlined"
                    disabled={!available}
                    onClick={handleAddToCart}
                    sx={{ marginBottom: '8px' }}
                >
                    {available ? 'Add to Cart' : 'Unavailable'}
                </Button>
            )}
        </Box>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    addToCart,
    updateCartItemQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfo);
