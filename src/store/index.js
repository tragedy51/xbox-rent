import { create } from 'zustand';
import { counterSlice } from '../modules/AllGames/store';
import { basketSlice } from '../modules/BasketCard/store/basket-slice';
import { layoutSlice } from '../layout/store';

export const useStore = create((...a) => ({
	...counterSlice(...a),
	...basketSlice(...a),
	...layoutSlice(...a),
}));
