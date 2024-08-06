export const counterSlice = (set) => ({
	counter: 0,
	activeGame: null,
	isEnd: false,
	setIsEnd: (bool) => set(() => ({ isEnd: bool })),
	setActiveGame: (game) => set(() => ({ activeGame: game })),
	increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
	emptyCounter: () => set(() => ({ counter: 0 })),
	decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
	setDirection: (direction) => set({ direction }),
	direction: 'down',
});
