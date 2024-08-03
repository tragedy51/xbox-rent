import { BasketCard } from '../../modules';
import cls from './basket.module.css';

export const Basket = () => {
	return (
		<main className={cls.Basket}>
			<div className='wrapper'>
				<h2 className={`section-title ${cls.basketTitle}`}>Корзина</h2>
				<BasketCard />
			</div>
		</main>
	);
};
