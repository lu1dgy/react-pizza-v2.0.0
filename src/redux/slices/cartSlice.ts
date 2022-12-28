import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { countTotalPrice } from './../../utils/countTotalPrice';
import { getItemsFromLS } from '../../utils/getItemsFromLS';
export type cartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number;
  types: string;
  count: number;
};

interface cartSliceState {
  totalPrice: number;
  items: cartItem[];
}

const initialState: cartSliceState = {
  totalPrice: getItemsFromLS().totalPrice,
  items: getItemsFromLS().items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<cartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = countTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = countTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = countTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
