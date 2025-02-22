// features/transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: [],
    reducers: {
        setTransactions(state, action) {
            return action.payload;
        },
        addTransaction(state, action) {
            state.push(action.payload);
        },
        updateTransaction(state, action) {
            const index = state.findIndex(transaction => transaction.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteTransaction(state, action) {
            return state.filter(transaction => transaction.id !== action.payload);
        },
    },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
