import { useStore } from '../../store';
// import { useRef } from 'react';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';
import cls from './CategoryBottomSheet.module.css';
import GamesFilteredBycategory from '../GamesFilteredBycategory/GamesFilteredBycategory';

export const CategoryBottomSheet = ({ adjustPosition }) => {
	// const scrollContainerRef = useRef(null);
	const {
		categoryBottomSheetIsOpen,
		setCategoryBottomSheetIsOpen,
		activeCategory,
	} = useStore((state) => state);

	return (
		<CustomBottomSheet
			adjustPosition={adjustPosition}
			isOpen={categoryBottomSheetIsOpen}
			setIsopen={setCategoryBottomSheetIsOpen}
			bottomSheetHeader={
				<div style={{ marginTop: 0 }} className={cls.sectionHeader}>
					<h2 style={{ fontWeight: 500 }} className='section-title'>
						{activeCategory.name}
					</h2>
				</div>
			}>
			<GamesFilteredBycategory inBottomSheet={true} />
		</CustomBottomSheet>
	);
};
