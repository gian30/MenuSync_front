import { Button, Stack } from '@mui/material';
function TagsBar({ tags, selectedTags, handleTagClick }) {
	return (
		<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%', marginBottom: '20px', overflowX: 'auto', zIndex: 1 }}>
			<Stack spacing={1} direction={{ xs: 'row', md: 'row' }}>
				{tags.map((tag) => (
					<Button
						key={tag}
						variant={'outlined'}
						onClick={() => handleTagClick(tag)}
						sx={{
							backgroundColor: selectedTags.includes(tag) ? '#eee' : '#fff',
							borderColor: '#eee',
							borderRadius: '40px',
							color: '#363636',
							boxShadow: 'none',
							cursor: 'pointer',
							marginRight: '1.6rem',
						}}
					>
						{tag}
					</Button>
				))}
			</Stack>
		</Stack>
	);
}
export default TagsBar;  