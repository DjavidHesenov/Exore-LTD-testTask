import { configureStore } from '@reduxjs/toolkit'
import customProductsReducer from './customProducts'
import authReducer from './auth'


const store = configureStore({
    reducer: { customProducts: customProductsReducer, auth: authReducer }
})

export default store