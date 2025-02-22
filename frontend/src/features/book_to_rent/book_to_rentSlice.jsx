import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooksToRent = createAsyncThunk('book_to_rent/fetchBooksToRent', async () => {
    const response = await fetch('http://localhost:8000/api/book-to-rent');
    if (!response.ok) throw new Error('Failed to fetch books to rent');
    return response.json();
});

const bookToRentSlice = createSlice({
    name: 'book_to_rent',
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooksToRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooksToRent.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooksToRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bookToRentSlice.reducer;
