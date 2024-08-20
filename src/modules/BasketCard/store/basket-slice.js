export const basketSlice = (set) => ({
	games: [],
	basketGamesId: [],
	basketPrice: 0,
	basketDiscountPrice: 0,
	addGameToBasket: (game) =>
		set((state) => {
			const inBasket = state.games.find((bgame) => bgame.id === game.id);
			const basketGamesId = [...state.basketGamesId, game.id]

			if (!inBasket) {
				const games = [...state.games, game];
				const basketPrice =
					state.basketPrice + Number(game.price.split(' ').join(''));
				let basketDiscountPrice;
				if (game.subprice !== '0.00') {
					basketDiscountPrice =
						state.basketDiscountPrice +
						Number(game.subprice.split(' ').join(''));
				} else {
					basketDiscountPrice =
						state.basketDiscountPrice +
						Number(game.price.split(' ').join(''));
				}

				return {
					games,
					basketPrice,
					basketDiscountPrice,
					basketGamesId
				};
			} else {
				return state;
			}
		}),
	deleteGameFromBasket: (game) =>
		set((state) => {
			const copyGames = [...state.games];
			const copyBasketGamesId = [...state.basketGamesId]
			const games = copyGames.filter((mgame) => mgame.id !== game.id);
			const basketGamesId = copyBasketGamesId.filter(bid => bid !== game.id)

			const basketPrice =
				state.basketPrice - Number(game.price.split(' ').join(''));
			let basketDiscountPrice;
			if (game.subprice !== '0.00') {
				basketDiscountPrice =
					state.basketDiscountPrice -
					Number(game.subprice.split(' ').join(''));
			} else {
				basketDiscountPrice =
					state.basketDiscountPrice -
					Number(game.price.split(' ').join(''));
			}

			return {
				games,
				basketPrice,
				basketDiscountPrice,
				basketGamesId
			};
		}),
});
