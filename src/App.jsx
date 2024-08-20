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
			{
				path: '/',
				element: <RentGames />,
			},
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
		WebApp.expand();
		WebApp.setHeaderColor('#172729');
		WebApp.disableVerticalSwipes(false);

		function handleOrientationChange() {
			if (window.orientation === 90) {
				window.orientation === 0;
			}
		}

		document.getElementById('root').style.height = `${WebApp.viewportHeight}px`;

		window.addEventListener('orientationchange', handleOrientationChange);

		return () =>
			window.removeEventListener('orientationchange', handleOrientationChange);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
