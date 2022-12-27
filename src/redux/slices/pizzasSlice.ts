import { RootState } from '../store';
import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type FetchPizzasArguments = {
  categoryId: string;
  sortProp: string;
  order: string;
  search: string;
  currentPage: number;
};

export type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaState {
  items: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArguments) => {
    const { categoryId, sortProp, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https:/6394ee6886829c49e82ab259.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortProp}&order=${order}${search}`
    );

    return data as Pizza[];
  }
);

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
