import { Box, Grid, Typography } from '@mui/material';
import MenuCard from './MenuCard';

function MenuItems({ groupedItemsByCategory }) {
	return (
		<Box sx={{ flex: 1 }}>
			{Object.entries(groupedItemsByCategory).map(([category, items]) => (
				<Box key={category} sx={{ marginBottom: 4 }} id={category.replace(/\s+/g, '-').toLowerCase()}>
					<Typography variant="h5" sx={{ marginBottom: 2 }}>{category}</Typography>
					<Grid container spacing={2}>
						{items.map((item) => (
							<Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
								<MenuCard item={item}/>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Box>
	);
}

export default MenuItems;
