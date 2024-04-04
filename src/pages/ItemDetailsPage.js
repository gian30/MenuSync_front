import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import { addToCart, updateCartItemQuantity } from '../store/actions/cartActions';
import { getItemById } from '../store/selectors/productsSelectors';
import { useParams } from 'react-router-dom';
import { fetchMenuItems } from '../store/actions/menuActions';
import ShoppingCart from '../components/ShoppingCart';
import FullItemInfo from '../components/FullItemInfo';
import QuantitySelector from '../components/QuantitySelector'; // Import QuantitySelector

function ItemDetailsPage({ item, fetchMenuItems, state, addToCart, updateCartItemQuantity }) {
    const { itemId } = useParams();

    useEffect(() => {
        if (!item) {
            fetchMenuItems();
        }
    }, [item, fetchMenuItems]);

    const selectedItem = getItemById(state, itemId);

    const { itemName, description, available, calories, carbohydrates, fats, proteins, tag, categories, photoLinks } = selectedItem || {};

    const [quantity, setQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (addedToCart && quantity === 0) {
            setAddedToCart(false);
        }
    }, [addedToCart, quantity]);

    const handleAddToCart = () => {
        addToCart(selectedItem);
        setQuantity(1);
        setAddedToCart(true);
        updateCartItemQuantity(itemId, 1);
    };

    const handleChangeQuantity = (newQuantity) => {
        setQuantity(newQuantity);
        updateCartItemQuantity(itemId, newQuantity);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <FullItemInfo
                itemName={itemName}
                description={description}
                available={available}
                tag={tag}
                categories={categories}
                calories={calories}
                carbohydrates={carbohydrates}
                fats={fats}
                proteins={proteins}
                photoLinks={photoLinks}
                quantity={quantity}
            />
            {addedToCart && (
                <QuantitySelector quantity={quantity} handleChangeQuantity={handleChangeQuantity} />
            )}
            <Button variant="contained" color="primary" onClick={handleAddToCart} disabled={!available || addedToCart}>
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            {addedToCart && (
                <ShoppingCart />
            )}
        </Box>
    );
}

ItemDetailsPage.propTypes = {
    item: PropTypes.object,
    fetchMenuItems: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    updateCartItemQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.products.loading,
    menuItems: state.products.items,
    state,
});

const mapDispatchToProps = {
    fetchMenuItems,
    addToCart,
    updateCartItemQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsPage);
