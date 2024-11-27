export const subsSlice = (set) => ({
	subInfoBottomSheetIsOpen: false,
	setSubInfoBottomSheetIsOpen: (bool) =>
		set(() => ({ gameInfoBottomSheetIsOpen: bool })),
});
