export const basketSlice = (set) => ({
	basketGamesId: [],
	basketDiscountPrice: 0,
	basketGamesCount: 0,
	basketId: null,
	setBasketGamesCount: (count) => set(() => ({ basketGamesCount: count })),
	setBasketId: (id) => set(() => ({ basketId: id })),
	setBasketGamesId: (gamesIds) => set(() => ({ basketGamesId: gamesIds })),
});
