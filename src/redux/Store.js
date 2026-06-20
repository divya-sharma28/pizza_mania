import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import PizzaReducer from "./reducers/PizzaReducer";
import CartReducer from "./reducers/CartReducer";
import UserReducer from "./reducers/UserReducer";
import OrdersReducer from "./reducers/OrdersReducer";

const rootReducer = combineReducers({
  pizzas: PizzaReducer,
  cart: CartReducer,
  users: UserReducer,
  orders: OrdersReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);