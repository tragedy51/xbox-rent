import cls from './Button.module.css';

const Button = ({ children, Icon, iconSize }) => {
	return (
		<button className={cls.button}>
			<Icon width={iconSize} height={iconSize} />
			{children}
		</button>
	);
};

export default Button;
