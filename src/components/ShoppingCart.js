import React, { useState } from 'react';
import { connect } from 'react-redux';
import ShoppingCartButton from './ShoppingCartButton';
import ShoppingCartPopover from './ShoppingCartPopover';

function ShoppingCart({ cartItems }) {
  // Calculate total quantity in the cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State to control popover open/close
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle popover open
  const handlePopoverOpen = (event) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  // Function to handle popover close
  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <ShoppingCartButton totalQuantity={totalQuantity} onClick={handlePopoverOpen} />
      <ShoppingCartPopover open={popoverOpen} onClose={handlePopoverClose} anchorEl={anchorEl} cartItems={cartItems} />
    </>
  );
}

// Map cartItems from Redux store to component props
const mapStateToProps = (state) => ({
  cartItems: state.cart.items, // Assuming your cart state structure has an 'items' array
});

// Connect ShoppingCart component to Redux store
export default connect(mapStateToProps)(ShoppingCart);
