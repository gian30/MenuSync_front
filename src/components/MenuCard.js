import React from 'react';
import { Box } from '@mui/material';
import ImageDisplay from './ImageDisplay';
import ItemInfo from './ItemInfo';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MenuCard({ item }) {
	const navigate = useNavigate();

	// Function to handle item click and navigate to details page
	const handleItemClick = (event) => {
		console.log(event.target.tagName)
		// Check if the target is not a button
		if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'LI' && event.target.tagName !== 'svg') {
			// Navigate to the item details page
			navigate(`/item-details/${item.id}`);
		}

	};

	return (
		<Box onClick={handleItemClick} sx={{ borderRadius: '16px', border: '1px solid #eee', cursor: 'pointer' }}>
			<ImageDisplay photoLinks={item.photoLinks} />
			<ItemInfo item={item} />
		</Box>
	);
}

export default connect()(MenuCard);
