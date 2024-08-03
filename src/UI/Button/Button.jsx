/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import cls from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = (
	{ children, Icon, iconSize, className, component = 'button', ...props },
	ref
) => {
	if (component === 'button') {
		return (
			<button ref={ref} className={`${cls.button} ${className}`} {...props}>
				{Icon && <Icon width={iconSize} height={iconSize} />}
				{children}
			</button>
		);
	}

	if (component === 'link') {
		return (
			<Link ref={ref} className={`${cls.button} ${className}`} {...props}>
				{Icon && <Icon width={iconSize} height={iconSize} />}
				{children}
			</Link>
		);
	}

	return (
		<button ref={ref} className={`${cls.button} ${className}`} {...props}>
			{Icon && <Icon width={iconSize} height={iconSize} />}
			{children}
		</button>
	);
};

export default forwardRef(Button);
