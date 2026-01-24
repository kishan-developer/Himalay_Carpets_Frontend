import { createSlice } from "@reduxjs/toolkit";
import getCookieByName from "../../utils/getCookie";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    isLoading: true, // Add this
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false; // ensure auth is resolved
            localStorage.removeItem("token");
            localStorage.clear();
        },
        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setToken, clearUser, setAuthLoading } =
    userSlice.actions;
export default userSlice.reducer;
