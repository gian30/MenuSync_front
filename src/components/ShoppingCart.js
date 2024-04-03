import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box, IconButton } from '@mui/material';
function ShoppingCart() {
	return (
		<Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 2 }}>
			<IconButton aria-label="Cart" color="primary" sx={{ borderRadius: '50%', backgroundColor: '#fff', padding: '10px' }}>
				<Badge badgeContent={4} color="error">
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
		</Box>
	);
}
export default ShoppingCart;