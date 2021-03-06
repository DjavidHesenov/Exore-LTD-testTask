import { createSlice } from "@reduxjs/toolkit"

const initialProductsState = { products: {} }

const productsSlice = createSlice({
    name: 'customProducts',
    initialState: initialProductsState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        }
    }
})
export const productsActions = productsSlice.actions

export default productsSlice.reducer