import { useStore } from '../../store';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './basket-card.module.css';
import { BasketGameCard } from './components';

export const BasketCard = ({ adjustPosition }) => {
	const {
		games: basketGames,
		basketPrice,
		basketDiscountPrice,
		basketBottomSheet,
		setBasketBottomSheet,
	} = useStore((state) => state);

	return (
		<>
			<CustomBottomSheet
				adjustPosition={adjustPosition}
				isOpen={basketBottomSheet}
				setIsopen={setBasketBottomSheet}>
				<section className='wrapper'>
					<div className='section-header'>
						<h2 style={{ marginTop: '10px' }} className='section-title'>
							Корзина
						</h2>
					</div>
					{basketGames.length === 0 ? (
						<p>No games</p>
					) : (
						<div className={cls.BasketCard}>
							{basketGames.map((game) => (
								<BasketGameCard key={game.id} game={game} />
							))}
							<div className={cls.priceCont}>
								{basketPrice !== basketDiscountPrice && (
									<p className={cls.discount}>{basketPrice} ₽</p>
								)}
								<p className={cls.price}>{basketDiscountPrice} ₽</p>
							</div>
						</div>
					)}
				</section>
			</CustomBottomSheet>
		</>
	);
};
