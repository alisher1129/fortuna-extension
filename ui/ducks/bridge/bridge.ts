import { createSlice } from '@reduxjs/toolkit';
import { swapsSlice } from '../swaps/swaps';

// Only states that are not in swaps slice
const initialState = {
  toChain: null,
};

const slice = createSlice({
  name: 'bridge',
  initialState: { ...swapsSlice.getInitialState(), ...initialState },
  reducers: {
    ...swapsSlice.reducer,
    setToChain: (state, action) => {
      state.toChain = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;

// Actions / action-creators

const {} = swapsSlice.actions;

const {} = actions;

export {};

// TODO use this in new bridge components
