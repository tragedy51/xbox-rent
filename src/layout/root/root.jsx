import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';

const Root = () => {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
};

export default Root;
