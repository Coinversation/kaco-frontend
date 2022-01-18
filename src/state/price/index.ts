import { createSlice } from '@reduxjs/toolkit';
import { PriceState } from 'state/types';
const initialState: PriceState = {
  priceVsBusdMap: {},
  total: 0,
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.priceVsBusdMap[action.payload.address] = action.payload.num;
    },
  },
});

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;
