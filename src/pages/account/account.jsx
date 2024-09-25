// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
	ChatIcon,
	QuestionIcon,
	OrdersIcon,
	InfoIcon,
	XboxSeries,
	XboxOne,
	TGIcon,
	VKIcon,
	YoutubeIcon,
	SettingsIcon,
} from '../../assets';
import cls from './account.module.css';
import { AccountButton } from './UI';
// import { getUserData } from './api/getUserData';
import WebApp from '@twa-dev/sdk';
import { hashString } from '../../helpers/hashString';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from './api/getUserData';
import AlertMessage from './UI/alert/alert-message';
import { changeConsole } from '../rent-games/components/select-console/api/changeConsole';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatePresence } from 'framer-motion';

const settings1 = [
	{
		text: 'Мои заказы',
		iconContBg: '#0284c7',
		Icon: OrdersIcon,
		onClick: () => {
			window.location = 'https://t.me/XboxRent_Bot?start=my_purchases_webapp';
			WebApp.close();
		},
	},
	{
		text: 'Статьи',
		iconContBg: '#0284c7',
		Icon: OrdersIcon,
		onClick: () => {
			window.location = 'https://t.me/XboxRent_Bot?start=my_purchases_webapp';
			WebApp.close();
		},
	},
	{
		text: 'Поддержка',
		iconContBg: '#fb923c',
		Icon: QuestionIcon,
		onClick: () => {
			window.location = 'https://t.me/XboxRent_Bot?start=support_webapp';
			WebApp.close();
		},
	},
	{
		text: 'Настройки',
		iconContBg: '#3b82f6',
		Icon: InfoIcon,
		onClick: () => {
			window.location = 'https://t.me/XboxRent_Bot?start=cabinet_webapp';
			WebApp.close();
		},
	},
];

const settings2 = [
	{
		text: 'Сообщество Xbox в Telegram',
		iconContBg: '#05a2f3',
		Icon: TGIcon,
		onClick: () => {
			window.location = 'https://t.me/Xbox_Rent';
			WebApp.close();
		},
	},
	{
		text: 'В Контакте',
		iconContBg: '#3576b6',
		Icon: VKIcon,
		onClick: () => {
			window.location = 'https://vk.com/xbox_one_g';
			WebApp.close();
		},
	},
	{
		text: 'Беседа XboxRent',
		iconContBg: '#18a34a',
		Icon: ChatIcon,
		onClick: () => {
			window.location = 'https://t.me/XboxRentChat';
			WebApp.close();
		},
	},
	{
		text: 'YouTube - XboxRent',
		iconContBg: '#fff',
		Icon: YoutubeIcon,
		onClick: () => {
			window.location = 'https://youtube.com/@xbox_one_g?si=yYOwRnE5jBAco38H';
			WebApp.close();
		},
	},
	{
		text: 'Настройка DNS',
		iconContBg: '#4f46e5',
		Icon: SettingsIcon,
	},
];

export const Account = () => {
	const [hash, setHash] = useState();
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const queryClient = useQueryClient();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [`user-info`],
		queryFn: () =>
			getUserData({
				token: hash,
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292,
			}),
		enabled: hash !== undefined,
	});

	const { mutate } = useMutation({
		mutationFn: changeConsole,
		onMutate: async (data) => {
			const newConsole = data.consoleType;
			await queryClient.cancelQueries({ queryKey: ['user-info'] });
			const previousUserData = queryClient.getQueryData(['user-info']);

			queryClient.setQueryData(['user-info'], {
				...previousUserData,
				console: newConsole,
			});

			return { previousUserData };
		},
		onError: (error, data, context) => {
			queryClient.setQueryData(['user-info'], context.previousUserData);
		},
		onSettled: () => {
			queryClient.invalidateQueries(['user-info']);
		},
		onSuccess: () => {
			setAlertIsOpen(true);
		},
	});

	function handleSelectConsole(consoleType) {
		hashString(
			import.meta.env.VITE_AUTH_TOKEN +
				(WebApp?.initDataUnsafe?.user?.id || 1147564292)
		).then((hash) => {
			mutate({
				token: hash,
				id: WebApp?.initDataUnsafe?.user?.id || 1147564292,
				consoleType,
			});
		});
	}

	useEffect(() => {
		hashString(
			import.meta.env.VITE_AUTH_TOKEN +
				(WebApp?.initDataUnsafe?.user?.id || 1147564292)
		).then((hash) => {
			setHash(hash);
		});
	}, []);

	useEffect(() => {
		if (WebApp) {
			console.log(WebApp?.initDataUnsafe);
		}
	}, []);

	if (isLoading) {
		return (
			<Icon
				style={{ margin: '0 auto' }}
				width={30}
				height={30}
				icon='eos-icons:loading'
			/>
		);
	}

	return (
		<main className={`${cls.accountMain}`}>
			<div className='wrapper'>
				<AnimatePresence>
					{alertIsOpen && (
						<AlertMessage
							message={'Сохранено'}
							isOpen={alertIsOpen}
							setIsOpen={setAlertIsOpen}
						/>
					)}
				</AnimatePresence>
				{WebApp?.initDataUnsafe?.user?.photo_url && (
					<img
						className={cls.userPhoto}
						src={WebApp?.initDataUnsafe?.user?.photo_url}
						alt=''
					/>
				)}
				<h2 className={cls.fullName}>
					{WebApp?.initDataUnsafe?.user
						? `${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`
						: 'User'}
				</h2>
				<p className={cls.userName}>{isSuccess ? data.balance : '0'} ₽</p>
				<div className={cls.allButtons}>
					<h2 className='section-title'>Выберите вашу консоль</h2>
					<div className={cls.consoleCards}>
						<div
							onClick={() => handleSelectConsole('xbox_series_x_s')}
							className={`${cls.consoleCard} ${
								data?.console === 'xbox_series_x_s' ? cls.active : ''
							}`}>
							<XboxSeries width={48} height={64} />
							<span>Xbox Series</span>
						</div>
						<div
							onClick={() => handleSelectConsole('xbox_one')}
							className={`${cls.consoleCard} ${
								data?.console === 'xbox_one' ? cls.active : ''
							}`}>
							<XboxOne width={64} height={64} />
							<span>Xbox One</span>
						</div>
					</div>
					<div className={cls.buttons}>
						{settings1.map((s, i) => (
							<AccountButton
								key={i}
								onClick={s.onClick}
								className={cls.accountBtn}
								Icon={s.Icon}
								iconContBg={s.iconContBg}
								text={s.text}
								subText={
									data && i === 0
										? data?.orders_count
										: i === 1
										? data?.articles_count
										: ''
								}
							/>
						))}
					</div>
					<div className={cls.buttons}>
						{settings2.map((s, i) => (
							<AccountButton
								key={i}
								className={cls.accountBtn}
								onClick={s.onClick}
								Icon={s.Icon}
								iconContBg={s.iconContBg}
								text={s.text}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};
