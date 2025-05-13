import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: '우석', age: 20 },
  reducers: {
    changeName(state) {
      state.name = 'park';
    },
    changeAge(state, action) {
      state.age += action.payload;
    },
  },
});
export let { changeName, changeAge } = user.actions;

export default user;
