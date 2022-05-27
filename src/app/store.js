import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import {persistReducer, persistStore,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const combinedReducer = combineReducers({
        auth: authReducer,
    }
);

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export default () => {
    const store = configureStore({
        reducer: persistedReducer
    });

    const persistor = persistStore(store);

    return {store, persistor};
}