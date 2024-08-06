import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import Root from './layout/root/root';
import { Account, Basket, RentGames, Search } from './pages';
import AllGames from './modules/AllGames/AllGames';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const router = createHashRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{ path: '/', element: <RentGames /> },
			{ path: '/account', element: <Account /> },
			{ path: '/basket', element: <Basket /> },
			{ path: '/:category', element: <AllGames /> },
		],
	},
	{
		path: '/search',
		element: <Search />,
	},
]);

function App() {
	const queryClient = new QueryClient();

	useEffect(() => {
		WebApp.ready();
		WebApp.setHeaderColor('#172729');
		WebApp.disableVerticalSwipes(false);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
