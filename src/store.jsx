import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice.jsx';
import cart from './store/cartSlice.jsx';

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
