/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo } from 'react';

import cls from './GameCard.module.css';
import { XSIcon } from '../../assets';
import { useStore } from '../../store';

const GameCard = (
	{
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
	const { changeXsIsOpen, setXsText } = useStore(
		(state) => state
	);

	function handleOpenXsInfo(e, name) {
		e.stopPropagation();
		setXsText(
			`Значок X|S обозначает что игра ${name} работает только на
						приставке Xbox Series S и Xbox Series X и не работает на приставке
						Xbox one.!`
		);
		changeXsIsOpen(true);
	}

	function handleOpenPreOrder(e, name) {
		e.stopPropagation();
		setXsText(
			`Иконка Предзаказ обозначает что игра ${name} еще не вышла, а выйдет она ХХ.ХХ.ХХХХ, но вы уже можете ее приобрести!`
		);
		changeXsIsOpen(true);
	}

	return (
		<>
			<div className={cls.gameCard} ref={ref} {...props}>
				<div className={cls.imgWrapper}>
					<img src={imgSrc} alt='' loading='lazy' />
					{preOrder && (
						<p
							onClick={(e) => handleOpenPreOrder(e, gameTitle)}
							className={cls.banner}>
							Предзаказ
						</p>
					)}
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
			</div>
		</>
	);
};

export default memo(forwardRef(GameCard));
