import { motion } from 'framer-motion';
import cls from './FooterBtns.module.css';
import { useStore } from '../../../../store';
import { useMemo } from 'react';
import { HeartIcon } from '../../../../assets';

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
	} = useStore((state) => state);

    const gameInBasket = useMemo(() => {
		return basketGames.find((bgame) => bgame.id === activeGame.id);
	}, [activeGame, basketGames]);

	return (
		<>
			<motion.div
				initial={{ transform: 'translateY(-110%)' }}
				animate={
					productAddToCardIsVisiible && !basketBottomSheet ? 'up' : 'down'
				}
				variants={footerBtnsVariants}
				className={cls.footerBtns}>
				<button
					onClick={() => addGameToBasket(activeGame)}
					className={cls.addToCart}>
					{gameInBasket ? 'Добавлено' : 'Добавить в корзину'}
				</button>
				<button className={cls.likeBtn}>
					<HeartIcon width={20} height={20} />
				</button>
			</motion.div>
			<motion.div
				initial={{ transform: 'translateY(-110%)' }}
				animate={basketBottomSheet ? 'up' : 'down'}
				transition={{ type: 'just' }}
				variants={footerBtnsVariants}
				className={cls.footerBtns}>
				<button className={cls.addToCart}>Перейти к оформлению</button>
			</motion.div>
		</>
	);
};
