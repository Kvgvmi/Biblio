// features/overdueSlice.js
import { createSlice } from '@reduxjs/toolkit';

const overdueSlice = createSlice({
    name: 'overdue',
    initialState: [],
    reducers: {
        setOverdues(state, action) {
            return action.payload;
        },
        addOverdue(state, action) {
            state.push(action.payload);
        },
        updateOverdue(state, action) {
            const index = state.findIndex(overdue => overdue.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteOverdue(state, action) {
            return state.filter(overdue => overdue.id !== action.payload);
        },
    },
});

export const { setOverdues, addOverdue, updateOverdue, deleteOverdue } = overdueSlice.actions;
export default overdueSlice.reducer;
