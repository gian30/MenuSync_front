import React from 'react';
import { Box, Popover, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button } from '@mui/material';

function ShoppingCartPopover({ open, onClose, anchorEl, cartItems }) {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // Calculate total VAT (assuming VAT is 10%)
  const totalVAT = totalPrice * 0.1;
  // Calculate total price including VAT
  const totalPriceIncludingVAT = totalPrice + totalVAT;

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ padding: '20px', minWidth: '300px' }}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start" disableGutters>
                <ListItemAvatar>
                  <Avatar alt={item.itemName} src={item.photoLinks[0]} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.itemName}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Price:</strong> ${item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Quantity:</strong> {item.quantity}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>VAT (10%):</strong> ${totalVAT.toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Total Price Including VAT:</strong> ${totalPriceIncludingVAT.toFixed(2)}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth onClick={onClose} sx={{ mt: 2 }}>
          Place Order
        </Button>
        {cartItems.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
            Your shopping cart is empty.
          </Typography>
        )}
      </Box>
    </Popover>
  );
}

export default ShoppingCartPopover;
