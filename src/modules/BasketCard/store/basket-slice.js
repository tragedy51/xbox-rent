export const basketSlice = (set) => ({
	games: [],
	basketPrice: 0,
	basketDiscountPrice: 0,
	addGameToBasket: (game) =>
		set((state) => {
			const inBasket = state.games.find((bgame) => bgame.id === game.id);

			if (!inBasket) {
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
			} else {
				return state;
			}
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
