import { motion } from 'framer-motion';
import cls from './FooterBtns.module.css';
import { useStore } from '../../../../store';
import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkoutBasket } from '../../api/checkoutBasket';
import WebApp from '@twa-dev/sdk';
// import { HeartIcon } from '../../../../assets';

const footerBtnsVariants = {
	up: {
		transform: 'translateY(-110%)',
	},
	down: {
		transform: 'translateY(140%)',
	},
};

export const FooterBtns = () => {
	const {
		basketBottomSheet,
		productAddToCardIsVisiible,
		addGameToBasket,
		games: basketGames,
		activeGame,
		basketGamesId,
	} = useStore((state) => state);

	const { mutate } = useMutation({
		mutationFn: checkoutBasket,
		onSuccess: () => {
			WebApp.close();
		},
	});

	const gameInBasket = useMemo(() => {
		return basketGames.find((bgame) => bgame.id === activeGame.id);
	}, [activeGame, basketGames]);

	function handleAddGameToBasket() {
		if (!gameInBasket) {
			navigator.vibrate =
				navigator.vibrate ||
				navigator.webkitVibrate ||
				navigator.mozVibrate ||
				navigator.msVibrator;
			if (navigator.vibrate) {
				navigator.vibrate(400);
			}
			addGameToBasket(activeGame);
		}
	}

	function handleCheckout() {
		mutate({
			telegramId: WebApp?.initDataUnsafe?.user?.id,
			basketGamesId,
		});
	}

	return (
		<>
			<motion.div
				initial={{ transform: 'translateY(-110%)' }}
				animate={
					productAddToCardIsVisiible && !basketBottomSheet ? 'up' : 'down'
				}
				variants={footerBtnsVariants}
				className={cls.footerBtns}>
				<button onClick={handleAddGameToBasket} className={cls.addToCart}>
					{gameInBasket ? 'Добавлено' : 'Добавить в корзину'}
				</button>
				{/* <button className={cls.likeBtn}>
					<HeartIcon width={20} height={20} />
				</button> */}
			</motion.div>
			<motion.div
				initial={{ transform: 'translateY(-110%)' }}
				animate={basketBottomSheet ? 'up' : 'down'}
				transition={{ type: 'just' }}
				variants={footerBtnsVariants}
				className={cls.footerBtns}>
				<button className={cls.addToCart} onClick={handleCheckout}>
					Перейти к оформлению
				</button>
			</motion.div>
		</>
	);
};
