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
            state.user = action.payload;
            state.isAuth = true;
            state.isError = false;
        },
        userExit: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isError = false;
        },
        userError: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isError = true;
        }
    },
})

const {actions, reducer} = applicationSlice;

export default reducer;

export const {
    userAdd,
    userExit,
    userError
} = actions;
