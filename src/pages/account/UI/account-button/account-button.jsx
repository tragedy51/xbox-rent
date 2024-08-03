import { RightArrowIcon } from '../../../../assets';
import cls from './account-button.module.css';

export const AccountButton = ({
	component = 'button',
	Icon,
	text,
	iconContBg,
	className,
}) => {
	if (component === 'button') {
		return (
			<button className={`${cls.button} ${className}`}>
				<div style={{ background: iconContBg }} className={cls.iconCont}>
					<Icon width={16} height={16} />
				</div>
				<div className={cls.buttonContent}>
					<p className={cls.btnText}>{text}</p>
					<RightArrowIcon
						className={cls.arrow}
						width={14}
						height={14}
						fill={'rgb(107 114 128)'}
					/>
				</div>
			</button>
		);
	}
};
