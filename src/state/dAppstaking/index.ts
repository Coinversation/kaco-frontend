import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { DAppstaking, WithdrawRecord } from 'state/types';

const initialState: DAppstaking = {
  apr: '',
  totalSupply: '',
  netValue: new BigNumber(0),
  withdrawRecord: [],
  loadArchivedFarmsData: false,
  userDataLoaded: false,
};
export const fetchWithdrawRecordAsync = createAsyncThunk<WithdrawRecord[]>(
  'dappstaking/fetchWithdrawRecordAsync',
  async ({}) => {
    // 当前已经提取的index
    // recordsIndex  -500
    // records.length -> 总量
    return [
      {
        blockNum: 0,
        address: 'string',
        amount: 0,
      },
    ];
  },
);
export const dAppstakingSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWithdrawRecordAsync.fulfilled, (state, action) => {
      action.payload.map((item, index) => {
        state.withdrawRecord[index] = {
          ...state.withdrawRecord[index],
          ...item,
        };
      });
    });
  },
});
export default dAppstakingSlice.reducer;
