import { Box, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import MenuItems from "./components/MenuItems";
import ShoppingCart from "./components/ShoppingCart";
import TagsBar from "./components/TagsBar";

function App() {
	const [menuItems, setMenuItems] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://menusync-back-82af2f8cc329.herokuapp.com/')
			.then(response => response.json())
			.then(data => {
				setMenuItems(data.data);
				setLoading(false);
			})
			.catch(error => console.error('Error fetching menu items:', error));
	}, []);

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
					<MenuItems groupedItemsByCategory={groupedItemsByCategory} />
					<ShoppingCart />
					<BottomBar categories={Object.keys(groupedItemsByCategory)} />
				</>
			)}
		</Box>
	);
}
export default App;