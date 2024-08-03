import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import MainBg from '../../assets/main-bg.jpg';
import { useStore } from '../../store';
import { Modal } from '../../UI';
// import { GameInfo } from '../../modules/game-info/game-info';
// import { BasketCard } from '../../modules/BasketCard/basket-card';
// import { CategoryBottomSheet } from '../../modules/CategoryBottomSheet/CategoryBottomSheet';

const Root = () => {
	const { XsIsOpen, changeXsIsOpen, XsGameName } =
		useStore((state) => state);

	return (
		<>
			<img className='main-bg' src={MainBg} alt='Main bg' />
			<Outlet />
			<Footer />
			<Modal isOpen={XsIsOpen} setIsopen={changeXsIsOpen}>
				<div className='xs-info'>
					<h3 className='xs-title section-title'>Подсказка</h3>
					<p>
						Значок X|S обозначает что игра {XsGameName} работает только на
						приставке Xbox Series S и Xbox Series X и не работает на приставке
						Xbox one.
					</p>
				</div>
			</Modal>
			{/* <CategoryBottomSheet adjustPosition={gameInfoBottomSheetIsOpen} />
			<GameInfo />
			<BasketCard /> */}
		</>
	);
};

export default Root;
