export const layoutSlice = (set) => ({
	XsIsOpen: false,
	categoryBottomSheetIsOpen: false,
	gameInfoBottomSheetIsOpen: false,
	searchBottomSheetIsOpen: false,
	basketBottomSheet: false,
	XsGameName: '',
	productAddToCardIsVisiible: false,
	countButtonUpIsShown: false,
	XsText: '',
	setXsText: (text) => set(() => ({ XsText: text })),
	changeXsIsOpen: (bool) => set(() => ({ XsIsOpen: bool })),
	closeXsIsOpen: () => set(() => ({ XsIsOpen: false })),
	setCategoryBottomSheetIsOpen: (bool) =>
		set(() => ({ categoryBottomSheetIsOpen: bool })),
	setGameInfoBottomSheetIsOpen: (bool) =>
		set(() => ({ gameInfoBottomSheetIsOpen: bool })),
	setSearchBottomSheetIsOpen: (bool) =>
		set(() => ({ searchBottomSheetIsOpen: bool })),
	setBasketBottomSheet: (bool) => set(() => ({ basketBottomSheet: bool })),
	setXsGameName: (name) => set(() => ({ XsGameName: name })),
	setProductAddToCardIsVisiible: (bool) =>
		set(() => ({ productAddToCardIsVisiible: bool })),
	setCountButtonUpIsShown: (bool) =>
		set(() => ({ countButtonUpIsShown: bool })),
});
