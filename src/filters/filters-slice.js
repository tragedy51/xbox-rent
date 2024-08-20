export const filterSlice = (set) => ({
	dateFilter: { filter: 'all-time', text: 'За все время' },
	setDateFilter: (date) =>
		set(() => ({ dateFilter: { filter: date.filter, text: date.text } })),
});
