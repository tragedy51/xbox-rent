import { CheckIcon, DollarIcon } from '../../assets';
import cls from './FilterButton.module.css';

export const FilterButton = ({ Icon, text, isChecked, onClick }) => {
	return (
		<button className={cls.filter} onClick={onClick}>
			<div className={cls.iconCont}>
				{Icon ? (
					<Icon width={16} height={16} />
				) : (
					<DollarIcon width={16} height={16} />
				)}
			</div>
			<div className={cls.filterText}>
				<p>{text}</p>
				{isChecked && (
					<CheckIcon width={16} height={16} fill={'rgb(59 130 246)'} />
				)}
			</div>
		</button>
	);
};
