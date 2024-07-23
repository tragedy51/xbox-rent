import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RentGames from './pages/RentGames';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const router = createHashRouter([{ path: '/', element: <RentGames /> }]);

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
