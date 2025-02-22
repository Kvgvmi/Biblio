// features/membershipSlice.js
import { createSlice } from '@reduxjs/toolkit';

const membershipSlice = createSlice({
    name: 'membership',
    initialState: [],
    reducers: {
        setMemberships(state, action) {
            return action.payload;
        },
        addMembership(state, action) {
            state.push(action.payload);
        },
        updateMembership(state, action) {
            const index = state.findIndex(membership => membership.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteMembership(state, action) {
            return state.filter(membership => membership.id !== action.payload);
        },
    },
});

export const { setMemberships, addMembership, updateMembership, deleteMembership } = membershipSlice.actions;
export default membershipSlice.reducer;
