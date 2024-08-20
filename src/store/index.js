import { create } from 'zustand';
import { counterSlice } from '../modules/AllGames/store';
import { basketSlice } from '../modules/BasketCard/store/basket-slice';
import { layoutSlice } from '../layout/store';
import { categoriesSlice } from '../modules/Categories/store/categories-slice';
import { filterSlice } from '../filters/filters-slice';

export const useStore = create((...a) => ({
	...counterSlice(...a),
	...basketSlice(...a),
	...layoutSlice(...a),
	...categoriesSlice(...a),
	...filterSlice(...a),
}));
