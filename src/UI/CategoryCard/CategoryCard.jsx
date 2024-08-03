/* eslint-disable react-refresh/only-export-components */
import cls from './CategoryCard.module.css';
import { forwardRef } from 'react';
import { num_word } from '../../helpers';
import { Drawer } from 'vaul';
import AllGames from '../../modules/AllGames/AllGames';

const CategoryCard = ({ imgSrc, category, count = 0, ...props }, ref) => {
	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<button ref={ref} className={cls.categoryCard} {...props}>
					<img src={imgSrc} alt={category} />
					<div className={cls.text}>
						<div className={cls.count}>
							<p>
								{count} {num_word(count, ['товар', 'товара', 'товаров'])}
							</p>
						</div>
						<p>{category}</p>
					</div>
				</button>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className={cls.overlay} />
				<Drawer.Content className={cls.content}>
					<div className={cls.categoryContent}>
						<AllGames inBottomSheet={true} />
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default forwardRef(CategoryCard);
