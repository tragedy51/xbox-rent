import { NavLink } from 'react-router-dom';

import cls from './footer.module.css';
import AccountIcon from './assets/icons/account-icon.svg?react';
import XboxIcon from './assets/icons/xbox-icon.svg?react';
import PresaleIcon from './assets/icons/presale-icon.svg?react';
import CatalogIcon from './assets/icons/catalog-icon.svg?react';
import { useStore } from '../../store';
import { BasketIcon } from '../../assets';
import { UpButtons } from './components/UpButtons/UpButtons';
import { FooterBtns } from './components/FooterBtns/FooterBtns';

const Footer = () => {
	const {
		closeXsIsOpen,
		basketBottomSheet,
		setBasketBottomSheet,
		setCategoryBottomSheetIsOpen,
		setGameInfoBottomSheetIsOpen,
		changeXsIsOpen,
	} = useStore((state) => state);

	function handleOpenBasket() {
		closeXsIsOpen();
		setBasketBottomSheet(true);
	}

	function closeAllModals() {
		changeXsIsOpen(false);
		setCategoryBottomSheetIsOpen(false);
		setGameInfoBottomSheetIsOpen(false);
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
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/presale'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<PresaleIcon width={24} height={24} />
					</NavLink>
					<NavLink
						onClick={handleOpenBasket}
						className={() => (basketBottomSheet ? cls.active : '')}>
						<BasketIcon width={24} height={24} />
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/catalog'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<CatalogIcon width={24} height={24} />
					</NavLink>
					<NavLink
						onClick={closeAllModals}
						to={'/account'}
						className={({ isActive }) => (isActive ? cls.active : '')}>
						<AccountIcon width={24} height={24} />
					</NavLink>
				</nav>
			</footer>
			<FooterBtns />
			<UpButtons />
		</>
	);
};

export default Footer;
