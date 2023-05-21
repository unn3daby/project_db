import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmarks: [],
    bookmarksIds: []
}

const applicationSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        bookmarksAdd: (state, action) => {
            state.bookmarks = action.payload;
            state.bookmarksIds = state.bookmarks.map(item => item.productId);
        },
    },
})

const {actions, reducer} = applicationSlice;

export default reducer;

export const {
    bookmarksAdd
} = actions;
