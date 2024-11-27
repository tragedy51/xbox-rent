import cls from './basket-game-card.module.css';
import { BasketIcon, DeleteIcon } from '../../../../assets';
import { useStore } from '../../../../store';
import WebApp from '@twa-dev/sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGameToBasket } from '../../../../layout/footer/api/addGameToBasket';
import { removeGameFromBasket } from '../../../../layout/footer/api/removeGameFromBasket';
import { removeSubFromBasket } from '../../../../layout/footer/api/removeSubFromBasket';

const gameType = {
	rent: 'Аренда',
	sub: 'Подписки',
};

export const BasketGameCard = ({ game, className, recommendation }) => {
	const queryClient = useQueryClient();
	const { basketGamesCount, setBasketBottomSheet, basketId } = useStore(
		(state) => state
	);
	const { mutate: addGameToBasketMutate } = useMutation({
		mutationFn: addGameToBasket,
		onSuccess: () => {
			queryClient.invalidateQueries('create-basket');
		},
	});
	const { mutate: removeGameFromBasketMutate } = useMutation({
		mutationFn: removeGameFromBasket,
		onSuccess: () => {
			queryClient.invalidateQueries('create-basket');
		},
	});

	const { mutate: removeSubFromBasketMutate } = useMutation({
		mutationFn: removeSubFromBasket,
		onSuccess: () => {
			queryClient.invalidateQueries('create-basket');
		},
	});

	function handleDeleteGameFromBasket(game) {
		if (game.type === 'sub') {
			removeSubFromBasketMutate({
				period_id: game.id,
				basket_id: basketId,
			});
		} else {
			removeGameFromBasketMutate({
				product_id: game.id,
				basket_id: basketId,
			});
		}

		if (basketGamesCount === 1) {
			setBasketBottomSheet(false);
		}
	}

	function handleAddGameToBasket() {
		WebApp.HapticFeedback.impactOccurred('light');
		addGameToBasketMutate({
			product_id: game.id,
			basket_id: basketId,
		});
	}

	return (
		<div className={`${cls.BasketGameCard} ${className}`}>
			<img className={cls.gameImg} src={game.image} alt='' />
			<div className={cls.gameInfo}>
				<div className={cls.gameText}>
					<h3 className={cls.gameTitle}>{game.title}</h3>
					<div className={cls.gamePriceCont}>
						{game.subprice && game.subprice !== '0.00' ? (
							<>
								<p className={cls.discount}>{game.price} ₽</p>
								<p className={cls.price}>{game.subprice} ₽</p>
							</>
						) : (
							<p className={cls.price}>{game.price} ₽</p>
						)}
					</div>
					<div className={cls.label}>{gameType[game.type]}</div>
				</div>
				{!recommendation ? (
					<button
						className={cls.deleteBtn}
						onClick={() => handleDeleteGameFromBasket(game)}>
						<DeleteIcon width={16} height={16} />
					</button>
				) : (
					<button
						className={cls.deleteBtn}
						onClick={() => handleAddGameToBasket(game)}>
						<BasketIcon width={24} height={24} />
					</button>
				)}
			</div>
		</div>
	);
};
