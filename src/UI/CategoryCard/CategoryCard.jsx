/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom';
import cls from './CategoryCard.module.css';
import { forwardRef } from 'react';

const CategoryCard = ({ route, imgSrc, category, count = 0 }, ref) => {
	return (
		<Link ref={ref} to={route} className={cls.categoryCard}>
			<img src={imgSrc} alt={category} />
			{/* <p className={cls.text}>{count}</p> */}
		</Link>
	);
};

export default forwardRef(CategoryCard);
