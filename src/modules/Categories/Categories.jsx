import { useEffect, useRef, useState } from 'react';
import CategoryCard from '../../UI/CategoryCard/CategoryCard';
import { motion } from 'framer-motion';

import cls from './Categories.module.css';
import DropdownArrow from '../../assets/icons/dropdown-arrows-icon.svg?react';

const CategoryFilter = () => {
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
			<div className='wrapper'>
				<h3 className={`${cls.categoryTitle}`}>
					Аренда игр <span>(285 position)</span>
				</h3>
			</div>
			<div className={`${cls.categoryFilter} wrapper`}>
				<div className='wrapper'>
					<motion.div
						animate={isOpen ? 'open' : 'close'}
						variants={categoriesContVariants}
						className={cls.categoryFilterCards}>
						<CategoryCard
							ref={categoryCardRef}
							imgSrc={
								'https://sun9-38.userapi.com/s/v1/ig2/4cvs3CLk9_l4kiKl_O18gmnfy7HeM-r84VoE90uaPtTXvFiD4nDdgcktvpKmkcnuwy4OhO_6uE2KCUAtTmhhtXgc.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720&from=bu&u=lweQaUprrjKdo9av2ogyUvdcMMf_ogQhv4V6e675Do0&cs=807x454'
							}
							category={'Хоррор'}
						/>
						<CategoryCard
							imgSrc={
								'https://sun9-76.userapi.com/s/v1/ig2/UueMdShDLeiw24lCiFNmptHIGK4Ita8z6Pp_IPKRzWR2iK4HZSUBghT_XCxB95jM6hCoreYS8Gd0Cx3fD1jP6Sve.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720&from=bu&u=DVOW4pLvotZQMufd4kYc6yCkquAjrSaLqcNjP_L9u94&cs=807x454'
							}
							category={'Шутеры'}
						/>
						<CategoryCard
							imgSrc={
								'https://sun9-76.userapi.com/s/v1/ig2/J8xL8rcYnWeOm7dY-GEdx1XaMBBHHKSggSIaiFD1SLZPUxs1KNDgN96t2no95YvPThlU9IfHxxYoJUomFDTNRdKW.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720&from=bu&u=3BpfYxD5y2lsKexKSXsKfvHDMQBqsEXGKp-JuaOyILw&cs=807x454'
							}
							category={'Спорт'}
						/>
						<CategoryCard
							imgSrc={
								'https://sun9-8.userapi.com/s/v1/ig2/dZYs0XuylbnT7w_N8gvlptpUi818n1vfP7MlJoUZTwnHKUgnfoOYbEBG9KZShYfSxNmTh_rBXZG1J0pRhYCgFuc4.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720&from=bu&u=LxDLdIVIE9k0Fa-Q4-ciZuXtRAKwrbckQT13nZgZmFY&cs=807x454'
							}
							category={'RPG'}
						/>
						<CategoryCard
							imgSrc={
								'https://sun9-6.userapi.com/s/v1/ig2/YiiC5z-caE37ud8G9GWTf6e0PR2oNMCpvWYPuKhb-aAk5S_SlXM63thxNhvH625928fEXjMly1_Jrj-haCZBfULA.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720&from=bu&u=BKXnFfcov_Y5tsmJUWUEp18co5nsEID091wHvcnuk8U&cs=807x454'
							}
							category={'Дети'}
						/>
						<div className={cls.shadow} />
					</motion.div>
					<button
						className={cls.dropdownButton}
						onClick={() => setIsOpen((prev) => !prev)}>
						<DropdownArrow width={16} height={16} />
						Показать больше
					</button>
				</div>
			</div>
		</section>
	);
};

export default CategoryFilter;
