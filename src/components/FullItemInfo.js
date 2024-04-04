import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function FullItemInfo({ itemName, description, available, tag, categories, calories, carbohydrates, fats, proteins, photoLinks }) {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                {itemName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Description: {description}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Available: {available ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Tag: {tag}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Categories: {categories && categories.join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Nutrition Information:
            </Typography>
            <Typography variant="body2" gutterBottom>
                - Calories: {calories}
            </Typography>
            <Typography variant="body2" gutterBottom>
                - Carbohydrates: {carbohydrates}
            </Typography>
            <Typography variant="body2" gutterBottom>
                - Fats: {fats}
            </Typography>
            <Typography variant="body2" gutterBottom>
                - Proteins: {proteins}
            </Typography>
            <div>
                {photoLinks && photoLinks.map((link, index) => (
                    <img key={index} src={link} alt={itemName} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                ))}
            </div>
        </div>
    );
}

FullItemInfo.propTypes = {
    itemName: PropTypes.string,
    description: PropTypes.string,
    available: PropTypes.bool,
    tag: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.string,
    carbohydrates: PropTypes.string,
    fats: PropTypes.string,
    proteins: PropTypes.string,
    photoLinks: PropTypes.arrayOf(PropTypes.string),
};

export default FullItemInfo;
