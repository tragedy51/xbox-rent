import { Icon } from '@iconify/react/dist/iconify.js';
import { useStore } from '../../../../store';
import { CustomBottomSheet } from '../../../../UI/BottomSheet/BottomSheet';

import cls from './style.module.css';
import Loading from '../../../../UI/Loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

const SubsInfo = ({ adjustPosition }) => {
	const {
		subInfoBottomSheetIsOpen,
		setSubInfoBottomSheetIsOpen,
		activeGame,
		isAdmin,
	} = useStore((state) => state);
	const content = useRef(null);

	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: [`sub-detail-${activeGame?.id}`],
		queryFn: () => {},
		enabled: activeGame?.id !== undefined,
	});

	return (
		<CustomBottomSheet
			shareIcon
			sheetBgColor='#232222'
			adjustPosition={adjustPosition}
			isOpen={subInfoBottomSheetIsOpen}
			setIsopen={setSubInfoBottomSheetIsOpen}>
			{isAdmin && (
				<a
					target='_blank'
					href={`https://api.xbox-rent.ru/admin/webapp/product/${activeGame?.id}`}
					className={cls.editButton}>
					<Icon
						style={{ display: 'block' }}
						width={20}
						height={20}
						icon='cuida:edit-outline'
					/>
				</a>
			)}
			<section style={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
				<Loading loading={isLoading} />
				<AnimatePresence>
					{!isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							{content.current}
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</CustomBottomSheet>
	);
};

export default SubsInfo;
