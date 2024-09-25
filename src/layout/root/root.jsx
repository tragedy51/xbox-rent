import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import MainBg from '../../assets/main-bg.jpg';
import { useStore } from '../../store';
import { Modal } from '../../UI';
import { useEffect } from 'react';
import ScrollToTop from '../../components/ScrollToTop';

const Root = () => {
	const { XsIsOpen, changeXsIsOpen, XsText, setBasketBottomSheet } = useStore(
		(state) => state
	);

	const location = useLocation();

	useEffect(() => {
		switch (location.pathname) {
			case '/basket':
				setBasketBottomSheet(true);
				return;
			default:
				return;
		}
	}, [location, setBasketBottomSheet]);

	return (
		<>
			<ScrollToTop />
			<img className='main-bg' src={MainBg} alt='Main bg' />
			<Outlet />
			<Footer />
			<Modal isOpen={XsIsOpen} setIsopen={changeXsIsOpen}>
				<div className='xs-info'>
					<h3 className='xs-title section-title'>Подсказка</h3>
					<p>{XsText}</p>
				</div>
			</Modal>
		</>
	);
};

export default Root;
