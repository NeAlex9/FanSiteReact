import {configureStore} from '@reduxjs/toolkit';
import reducer from '../features/authSlice'

export const store = configureStore({
    reducer: {
        authReducer: reducer,
    },
});