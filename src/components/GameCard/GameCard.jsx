/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo } from 'react';

import cls from './GameCard.module.css';
import { BasketIcon, XSIcon } from '../../assets';
import { useStore } from '../../store';

const GameCard = (
	{
		game,
		imgSrc,
		gameTitle,
		gamePrice,
		gameDiscountPrice,
		preOrder = false,
		xs = false,
		...props
	},
	ref
) => {
	const {
		changeXsIsOpen,
		setXsGameName,
		addGameToBasket,
		games,
		deleteGameFromBasket,
	} = useStore((state) => state);

	const gameInBasket = games.find((bgame) => bgame.id === game.id);

	function handleOpenXsInfo(e, name) {
		e.stopPropagation();
		setXsGameName(name);
		changeXsIsOpen(true);
	}

	function handleGameAddToBasket(e, game) {
		e.stopPropagation();
		if (gameInBasket) {
			deleteGameFromBasket(game);
		} else {
			addGameToBasket(game);
		}
	}

	return (
		<>
			<div className={cls.gameCard} ref={ref} {...props}>
				<div className={cls.imgWrapper}>
					<img src={imgSrc} alt='' loading='lazy' />
					{preOrder && <p className={cls.banner}>Предзаказ</p>}
					{xs && (
						<div className={cls.XSCont}>
							<button onClick={(e) => handleOpenXsInfo(e, gameTitle)}>
								<XSIcon width={45} height={35} />
							</button>
						</div>
					)}
				</div>
				<div className={cls.gameInfo}>
					<h2 className={cls.gameTitle}>{gameTitle}</h2>
					<div className={cls.gamePriceCont}>
						{gameDiscountPrice && (
							<div className={cls.discount}>{gameDiscountPrice} ₽</div>
						)}
						<p className={cls.price}>{gamePrice} ₽</p>
					</div>
				</div>
				<button
					className={cls.basketBtn}
					onClick={(e) => handleGameAddToBasket(e, game)}>
					<BasketIcon
						width={20}
						height={20}
						fill={gameInBasket ? '#00FF0066' : '#ffffff99'}
					/>
				</button>
			</div>
		</>
	);
};

export default memo(forwardRef(GameCard));
