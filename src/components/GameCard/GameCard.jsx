/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo } from 'react';

import cls from './GameCard.module.css';
import { XSIcon } from '../../assets';
import russianFlagImg from '../../assets/icons/russian-flag-icon.svg';
import { useStore } from '../../store';

const GameCard = (
	{
		imgSrc,
		gameTitle,
		gamePrice,
		subprice,
		preOrder = false,
		xs = false,
		rus = false,
		seriesCard,
		size = 'md',
		...props
	},
	ref
) => {
	const { changeXsIsOpen, setXsText } = useStore((state) => state);

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
			<div className={`${cls.gameCard} ${cls[size]}`} ref={ref} {...props}>
				<div className={cls.imgWrapper}>
					<img src={imgSrc} alt='' loading='lazy' />
					{preOrder && (
						<p
							onClick={(e) => handleOpenPreOrder(e, gameTitle)}
							className={cls.banner}>
							Предзаказ
						</p>
					)}

					<div className={cls.XSCont}>
						{xs && (
							<button
								className={cls.xsBtn}
								onClick={(e) => handleOpenXsInfo(e, gameTitle)}>
								<XSIcon width={45} height={35} />
							</button>
						)}
						{rus && (
							<button className={cls.rusBtn}>
								<img src={russianFlagImg} alt='' />
							</button>
						)}
					</div>
				</div>
				<div className={cls.gameInfo}>
					<h2
						className={`${cls.gameTitle} ${
							seriesCard ? cls.seriesCardTitle : ''
						}`}>
						{gameTitle}
					</h2>
					<div className={cls.gamePriceCont}>
						{subprice && subprice !== '0.00' ? (
							<>
								<div className={cls.discount}>{gamePrice} ₽</div>
								<p className={cls.price}>{subprice} ₽</p>
							</>
						) : (
							gamePrice && <p className={cls.price}>{gamePrice} ₽</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(forwardRef(GameCard));
