import { Box, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import BottomBar from "../components/BottomBar";
import MenuItems from "../components/MenuItems";
import ShoppingCart from "../components/ShoppingCart";
import TagsBar from "../components/TagsBar";
import { fetchMenuItems } from '../store/actions/menuActions';

function MainPage({ fetchMenuItems, loading, menuItems }) {
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    useEffect(() => {
        console.log("Menu Items:", menuItems); // Log loaded menu items
    }, [menuItems]);

    const handleTagClick = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    const allTags = menuItems.reduce((tags, item) => {
        if (item.tag && !tags.includes(item.tag)) {
            return [...tags, item.tag];
        }
        return tags;
    }, []);

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
            position: 'relative', // Added position relative to the main container
        }}>
            {loading ? (
                <Typography variant="h4">Loading...</Typography>
            ) : (
                <>
                    <TagsBar tags={allTags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
                    <MenuItems groupedItemsByCategory={groupedItemsByCategory}/>
                    <ShoppingCart />
                    <BottomBar categories={Object.keys(groupedItemsByCategory)} />
                </>
            )}
        </Box>
    );
}

const mapStateToProps = (state) => ({
    loading: state.products.loading,
    menuItems: state.products.items,
});

const mapDispatchToProps = {
    fetchMenuItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
