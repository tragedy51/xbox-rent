import { NavLink } from 'react-router-dom';

import cls from './footer.module.css';
import AccountIcon from './assets/icons/account-icon.svg?react';
import XboxIcon from './assets/icons/xbox-icon.svg?react';
import PresaleIcon from './assets/icons/presale-icon.svg?react';
import { useStore } from '../../store';
import { CalendarIcon, CoinsIcon } from '../../assets';
import { UpButtons } from './components/UpButtons/UpButtons';
import { FooterBtns } from './components/FooterBtns/FooterBtns';

const Footer = () => {
	const {
		setBasketBottomSheet,
		setCategoryBottomSheetIsOpen,
		setGameInfoBottomSheetIsOpen,
		changeXsIsOpen,
	} = useStore((state) => state);

	function closeAllModals() {
		setGameInfoBottomSheetIsOpen(false);
		changeXsIsOpen(false);
		setCategoryBottomSheetIsOpen(false);
		setBasketBottomSheet(false);
	}

	return (
		<>
			<footer className={cls.footer}>
				<nav>
					<NavLink
						to={'/'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<XboxIcon width={24} height={24} />
						<div className={cls.dott} />
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/buy-games'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<PresaleIcon width={24} height={24} />
						<div className={cls.dott} />
					</NavLink>
					<NavLink
						to={'/subscriptions'}
						// onClick={handleOpenBasket}
						onClick={closeAllModals}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<CalendarIcon width={24} height={24} />
						<div className={cls.dott} />
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/currency'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<CoinsIcon width={24} height={24} />
						<div className={cls.dott} />
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/account'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<AccountIcon width={24} height={24} />
						<div className={cls.dott} />
					</NavLink>
				</nav>
			</footer>
			<UpButtons />
			<FooterBtns />
		</>
	);
};

export default Footer;
