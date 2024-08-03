export const layoutSlice = (set) => ({
	XsIsOpen: false,
	categoryBottomSheetIsOpen: false,
	gameInfoBottomSheetIsOpen: false,
	basketBottomSheet: false,
	XsGameName: '',
	changeXsIsOpen: (bool) => set(() => ({ XsIsOpen: bool })),
	closeXsIsOpen: () => set(() => ({ XsIsOpen: false })),
	setCategoryBottomSheetIsOpen: (bool) =>
		set(() => ({ categoryBottomSheetIsOpen: bool })),
	setGameInfoBottomSheetIsOpen: (bool) =>
		set(() => ({ gameInfoBottomSheetIsOpen: bool })),
	setBasketBottomSheet: (bool) => set(() => ({ basketBottomSheet: bool })),
	setXsGameName: (name) => set(() => ({ XsGameName: name })),
});
