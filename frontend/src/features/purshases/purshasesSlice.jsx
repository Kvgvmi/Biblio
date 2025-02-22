// features/purchasesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases(state, action) {
            return action.payload;
        },
        addPurchase(state, action) {
            state.push(action.payload);
        },
        updatePurchase(state, action) {
            const index = state.findIndex(purchase => purchase.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deletePurchase(state, action) {
            return state.filter(purchase => purchase.id !== action.payload);
        },
    },
});

export const { setPurchases, addPurchase, updatePurchase, deletePurchase } = purchasesSlice.actions;
export default purchasesSlice.reducer;
