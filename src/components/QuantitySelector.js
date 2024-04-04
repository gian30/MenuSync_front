import { Box, MenuItem, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function QuantitySelector({ quantity, handleChangeQuantity }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ marginRight: '8px' }}>Quantity:</Typography>
            <Select
                value={quantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
            >
                {[...Array(11).keys()].map((value) => (
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                ))}
            </Select>
        </Box>
    );
}

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    handleChangeQuantity: PropTypes.func.isRequired,
};

export default QuantitySelector;
