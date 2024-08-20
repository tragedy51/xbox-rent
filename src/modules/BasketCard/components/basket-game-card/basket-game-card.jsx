import cls from './basket-game-card.module.css';
import { DeleteIcon } from '../../../../assets';
import { useStore } from '../../../../store';

export const BasketGameCard = ({ game, className }) => {
	const {
		deleteGameFromBasket,
		games: basketGames,
		setBasketBottomSheet,
	} = useStore((state) => state);

	function handleDeleteGameFromBasket(game) {
		deleteGameFromBasket(game);

		if (basketGames.length === 1) {
			setBasketBottomSheet(false);
		}
	}

	return (
		<div className={`${cls.BasketGameCard} ${className}`}>
			<img className={cls.gameImg} src={game.image} alt='' />
			<div className={cls.gameInfo}>
				<div className={cls.gameText}>
					<h3 className={cls.gameTitle}>{game.title}</h3>
					<div className={cls.gamePriceCont}>
						{game.subprice !== '0.00' ? (
							<>
								<p className={cls.discount}>{game.price} ₽</p>
								<p className={cls.price}>{game.subprice} ₽</p>
							</>
						) : (
							<p className={cls.price}>{game.price} ₽</p>
						)}
					</div>
				</div>
				<button
					className={cls.deleteBtn}
					onClick={() => handleDeleteGameFromBasket(game)}>
					<DeleteIcon width={16} height={16} />
				</button>
			</div>
		</div>
	);
};
