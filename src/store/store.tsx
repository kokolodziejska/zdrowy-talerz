import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartStore";
import { loadState, saveState } from "./localStorage"; 

const preloadedState = {
  cart: loadState(), 
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().cart); 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
