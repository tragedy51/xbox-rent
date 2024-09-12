export const categoriesSlice = (set) => ({
	activeCategory: { id: null, name: null },
	activeSeries: {id: null, name: null},
	setActiveCategory: (id, name) =>
		set(() => ({ activeCategory: { id, name } })),
	setActiveSeries: (id, name) =>
		set(() => ({ activeSeries: { id, name } })),
});
