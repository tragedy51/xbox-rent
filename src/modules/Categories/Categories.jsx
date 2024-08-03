import { useEffect, useRef, useState } from 'react';
import CategoryCard from '../../UI/CategoryCard/CategoryCard';
import { motion } from 'framer-motion';

import cls from './Categories.module.css';
import DropdownArrow from '../../assets/icons/dropdown-arrows-icon.svg?react';
import CategoriesIcon from '../../layout/footer/assets/icons/catalog-icon.svg?react';
import horrorCategoryBg from '../../assets/imgs/horror-category-bg.jpg';
import racingCategoryBg from '../../assets/imgs/racing-category-bg.jpg';
import RPGCategoryBg from '../../assets/imgs/RPG-category-bg.jpg';
import familyCategoryBg from '../../assets/imgs/family-category-bg.jpg';
import shootingCategoryBg from '../../assets/imgs/shooting-category-bg.jpg';
import { useStore } from '../../store';

const CategoryFilter = () => {
	const { setCategoryBottomSheetIsOpen } = useStore((state) => state);
	const [isOpen, setIsOpen] = useState(false);
	const [categoriesContVariants, setCategoriesContVariants] = useState();
	const categoryCardRef = useRef(null);

	useEffect(() => {
		const height =
			categoryCardRef.current.offsetHeight +
			categoryCardRef.current.offsetHeight / 2;

		setCategoriesContVariants({
			open: {
				height: 'auto',
			},
			close: {
				height: `${height}px`,
			},
		});
	}, []);

	return (
		<section>
			<div className='wrapper section-header' style={{ marginBottom: '5px' }}>
				<h3 className='section-title'>
					<CategoriesIcon />
					Категории
				</h3>
			</div>
			<div className={`${cls.categoryFilter}`}>
				<motion.div
					animate={isOpen ? 'open' : 'close'}
					variants={categoriesContVariants}
					className={cls.categoryFilterCards}>
					<CategoryCard
						ref={categoryCardRef}
						imgSrc={horrorCategoryBg}
						category={'Хоррор'}
						count={10}
						onClick={() => setCategoryBottomSheetIsOpen(true)}
					/>
					<CategoryCard
						imgSrc={shootingCategoryBg}
						category={'Шутеры'}
						count={1}
					/>
					<CategoryCard
						imgSrc={racingCategoryBg}
						category={'Спорт'}
						count={2}
					/>
					<CategoryCard imgSrc={RPGCategoryBg} category={'RPG'} count={21} />
					<CategoryCard imgSrc={familyCategoryBg} category={'Дети'} />
					<div className={cls.shadow} />
				</motion.div>
				<button
					className={`${cls.dropdownButton} ${isOpen ? cls.open : ''}`}
					onClick={() => setIsOpen((prev) => !prev)}>
					<DropdownArrow className='dropdown-icon' width={16} height={16} />
					Показать {isOpen ? 'меньше' : 'больше'}
				</button>
			</div>
		</section>
	);
};

export default CategoryFilter;
