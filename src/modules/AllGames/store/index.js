export const counterSlice = (set) => ({
	counter: 0,
	increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
	emptyCounter: () => set(() => ({ counter: 0 })),
	decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
	setDirection: (direction) => set({ direction }),
	direction: 'down',
});
