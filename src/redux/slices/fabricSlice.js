import { createSlice } from "@reduxjs/toolkit";

const fabricSlice = createSlice({
    name: "fabric",
    initialState: ["fabric"],
    reducers: {
        setFabrics: (state, action) => {
            return action.payload; // Replaces entire state with the new array
        },
    },
});

export const { setFabrics } = fabricSlice.actions;
export default fabricSlice.reducer;
