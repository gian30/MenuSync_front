import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ItemDetailsPage from './pages/ItemDetailsPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/item-details/:itemId" element={<ItemDetailsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
