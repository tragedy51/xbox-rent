import { useStore } from '../../store';
// import cls from './CategoryBottomSheet.module.css';
import AllGames from '../AllGames/AllGames';
// import { useRef } from 'react';
import { CustomBottomSheet } from '../../UI/BottomSheet/BottomSheet';

export const CategoryBottomSheet = () => {
	// const scrollContainerRef = useRef(null);
	const { categoryBottomSheetIsOpen, setCategoryBottomSheetIsOpen } = useStore(
		(state) => state
	);

	return (
		<CustomBottomSheet
			isOpen={categoryBottomSheetIsOpen}
			setIsopen={setCategoryBottomSheetIsOpen}>
			<AllGames inBottomSheet={true} />
		</CustomBottomSheet>
	);
};
