import { games } from '../../consts/games';
import { useStore } from '../../store';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './basket-card.module.css';
import { BasketGameCard } from './components';

export const BasketCard = () => {
	const {
		games: basketGames,
		basketPrice,
		basketDiscountPrice,
		basketBottomSheet,
		setBasketBottomSheet,
	} = useStore((state) => state);

	return (
		<CustomBottomSheet
			isOpen={basketBottomSheet}
			setIsopen={setBasketBottomSheet}>
			{games.length === 0 ? (
				<p>No games</p>
			) : (
				<div className={cls.BasketCard}>
					{basketGames.map((game) => (
						<BasketGameCard key={game.id} game={game} />
					))}
					<div className={cls.priceCont}>
						{basketPrice !== basketDiscountPrice && (
							<p className={cls.discount}>{basketDiscountPrice} ₽</p>
						)}
						<p className={cls.price}>{basketPrice} ₽</p>
					</div>
					<button className={cls.buyPrice}>Перейти к оформлению</button>
				</div>
			)}
		</CustomBottomSheet>
	);
};
