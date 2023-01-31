import { createSlice } from "@reduxjs/toolkit";

export const PaginationSlice = createSlice({
    name: "Pagination",
    initialState: {
        pageBlueberrys: 1
    },
    reducers: {
        onPageBlueberrys: (state, {payload}) => {
            state.pageBlueberrys = payload
        }
    }
})

export const {onPageBlueberrys} = PaginationSlice.actions