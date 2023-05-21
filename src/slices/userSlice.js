import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: 0,
    isAuth: false,
    isError: false
}

const applicationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userAdd: (state, action) => {
            state.user = action.payload.user;
            state.isAuth = action.payload.isAuth;
            state.isError = action.payload.isError;
        },
        userExit: (state) => {
            state.user = 0;
            state.isAuth = false;
            state.isError = false;
        },
    },
})

const {actions, reducer} = applicationSlice;

export default reducer;

export const {
    userAdd,
    userExit
} = actions;
