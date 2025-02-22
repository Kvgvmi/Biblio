// features/rentalsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const rentalsSlice = createSlice({
    name: 'rentals',
    initialState: [],
    reducers: {
        setRentals(state, action) {
            return action.payload;
        },
        addRental(state, action) {
            state.push(action.payload);
        },
        updateRental(state, action) {
            const index = state.findIndex(rental => rental.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteRental(state, action) {
            return state.filter(rental => rental.id !== action.payload);
        },
    },
});

export const { setRentals, addRental, updateRental, deleteRental } = rentalsSlice.actions;
export default rentalsSlice.reducer;
