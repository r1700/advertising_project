import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '../redux/userSlice.js'
import purchaseHistoryReducer from '../redux/purchaseHistorySlice1.js'
import subScriptionReducer from '../redux/SubScriptionSlice.js'
import productReducer from '../redux/productSlice1.js'
import RentalHistoryReducer from '../redux/RentalHistorySlice.js'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
// import { persistReducer } from 'redux-persist';
// import rootReducer from './rootReducer'; // או combineReducers שלך

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer']
}
const rootReducer = combineReducers({
     userReducer,
     purchaseHistoryReducer,
     subScriptionReducer,
     productReducer,
     RentalHistoryReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
    
})
export const persistor=persistStore(store)
export const AppDispatch=store.dispatch;