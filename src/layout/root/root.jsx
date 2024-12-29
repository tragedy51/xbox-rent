import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import MainBg from '../../assets/main-bg.jpg';
import { useStore } from '../../store';
import { Modal } from '../../UI';
import {
	useEffect,
	// useRef,
	useState,
} from 'react';
import ScrollToTop from '../../components/ScrollToTop';
import Loading from '../../UI/Loading/Loading';
import { BasketCard } from '../../modules';
import SelectConsole from '../../pages/rent-games/components/select-console/select-console';
import { hashString } from '../../helpers/hashString';
import WebApp from '@twa-dev/sdk';
import { checkUserConsole } from '../../pages/rent-games/api/checkConsole';
import { useQuery } from '@tanstack/react-query';
import { getAndCreateBasket } from './api/getAndCreateBasket';
import parse from 'html-react-parser';

// const allContentVariants = {
// 	isHidden: {
// 		opacity: 0,
// 	},
// 	isVisible: {
// 		opacity: 1,
// 	},
// };

const Root = () => {
	const [openConsoleModal, setOpenConsoleModal] = useState(false);
	// const container = useRef();

	const [hash, setHash] = useState();
	const {
		XsIsOpen,
		changeXsIsOpen,
		XsText,
		setBasketBottomSheet,
		loading,
		setIsAdmin,
		setBasketId,
		setBasketGamesCount,
		setBasketGamesId,
		XsTitle,
	} = useStore((state) => state);

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

	const { data, isSuccess } = useQuery({
		queryKey: ['user-info'],
		queryFn: () =>
			checkUserConsole({
				token: hash,
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292, //815737483
			}),
		enabled: hash !== undefined,
	});

	// eslint-disable-next-line no-unused-vars
	const { data: basket, isSuccess: basketCreateIsSuccess } = useQuery({
		queryKey: ['create-basket'],
		queryFn: () =>
			getAndCreateBasket({
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292,
			}),
	});

	useEffect(() => {
		if (basketCreateIsSuccess && basket) {
			setBasketId(basket.basket_id);
			setBasketGamesCount(basket.items.length + basket.subs.length);
			setBasketGamesId(basket.current_item_ids);
		}
	}, [
		basketCreateIsSuccess,
		setBasketId,
		basket,
		setBasketGamesCount,
		setBasketGamesId,
	]);

	useEffect(() => {
		hashString(
			import.meta.env.VITE_AUTH_TOKEN +
				(WebApp?.initDataUnsafe?.user?.id || 1147564292) //815737483
		).then((hash) => {
			setHash(hash);
		});
	}, []);

	useEffect(() => {
		if (isSuccess) {
			if (!data.console) {
				setOpenConsoleModal(true);
			}
			setIsAdmin(data.is_admin);
		}
	}, [data, isSuccess, setIsAdmin]);

	return (
		<>
			<ScrollToTop />
			<img className='main-bg' src={MainBg} alt='Main bg' />
			<Loading loading={loading} />
			<SelectConsole
				openConsoleModal={openConsoleModal}
				setOpenConsoleModal={setOpenConsoleModal}
			/>
			<div style={{ opacity: 1 }} className='allContent'>
				<Outlet />
				<Footer />
				<Modal isOpen={XsIsOpen} setIsopen={changeXsIsOpen}>
					<div className='xs-info'>
						<h3 className='xs-title section-title'>{XsTitle}</h3>
						<p>{parse(XsText)}</p>
					</div>
				</Modal>
				<BasketCard />
			</div>
		</>
	);
};

export default Root;
