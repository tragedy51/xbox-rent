import { useStore } from '../../store';
import cls from './CategoryBottomSheet.module.css';
import AllGames from '../AllGames/AllGames';
// import { useRef } from 'react';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';

export const CategoryBottomSheet = ({ adjustPosition }) => {
	// const scrollContainerRef = useRef(null);
	const { categoryBottomSheetIsOpen, setCategoryBottomSheetIsOpen } = useStore(
		(state) => state
	);

	return (
		<CustomBottomSheet
			adjustPosition={adjustPosition}
			isOpen={categoryBottomSheetIsOpen}
			setIsopen={setCategoryBottomSheetIsOpen}
			bottomSheetHeader={
				<div style={{ marginTop: 0 }} className={cls.sectionHeader}>
					<h2 style={{ fontWeight: 500 }} className='section-title'>
						Хоррор{' '}
					</h2>
				</div>
			}>
			<AllGames inBottomSheet={true} />
		</CustomBottomSheet>
	);
};
