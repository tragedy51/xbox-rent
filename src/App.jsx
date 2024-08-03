import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import Root from './layout/root/root';
import { Account, Basket, RentGames, Search } from './pages';
import AllGames from './modules/AllGames/AllGames';

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

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
