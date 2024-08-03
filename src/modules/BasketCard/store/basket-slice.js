export const basketSlice = (set) => ({
	games: [],
	basketPrice: 0,
	basketDiscountPrice: 0,
	addGameToBasket: (game) =>
		set((state) => {
			const games = [...state.games, game];
			const basketPrice =
				state.basketPrice + Number(game.gamePrice.split(' ').join(''));
			let basketDiscountPrice;
			if (game.gameDiscountPrice) {
				basketDiscountPrice =
					state.basketDiscountPrice +
					Number(game.gameDiscountPrice.split(' ').join(''));
			} else {
				basketDiscountPrice =
					state.basketDiscountPrice +
					Number(game.gamePrice.split(' ').join(''));
			}

			return {
				games,
				basketPrice,
				basketDiscountPrice,
			};
		}),
	deleteGameFromBasket: (game) =>
		set((state) => {
			const copyGames = [...state.games];
			const games = copyGames.filter((mgame) => mgame.id !== game.id);
			const basketPrice =
				state.basketPrice - Number(game.gamePrice.split(' ').join(''));
			let basketDiscountPrice;
			if (game.gameDiscountPrice) {
				basketDiscountPrice =
					state.basketDiscountPrice -
					Number(game.gameDiscountPrice.split(' ').join(''));
			} else {
				basketDiscountPrice =
					state.basketDiscountPrice -
					Number(game.gamePrice.split(' ').join(''));
			}

			return {
				games,
				basketPrice,
				basketDiscountPrice,
			};
		}),
});
