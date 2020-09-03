import contactReducer from '../Redux/Reducers/Reducers'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


const defaultMiddleware = getDefaultMiddleware();

  const store = configureStore({
    reducer: {
      state: contactReducer,
    },
    middleware: [...defaultMiddleware],
  });

export default store