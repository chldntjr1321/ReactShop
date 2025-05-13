import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    countUp(state, action) {
      let matchId = state.find((state) => state.id == action.payload);
      matchId.count++;
    },
    addItem(state, action) {
      let matchId = state.find((state) => state.id == action.payload.id);
      if (matchId) {
        matchId.count++;
      } else {
        state.push(action.payload);
      } // matchId ? matchId.count++ : state.push(action.payload) 도 가능은 하지만 sideEffect 발생 ➡️ 추천 ❌
    },
    deleteItem(state, action) {
      let findIndex = state.findIndex((state) => state.id == action.payload);
      state.splice(findIndex, 1);
    },
  },
});

export let { countUp, addItem, deleteItem } = cart.actions;
export default cart;
