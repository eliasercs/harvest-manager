import { createSlice } from "@reduxjs/toolkit";

export const PeriodSlice = createSlice({
    name: 'Period',
    initialState: {
        monthState: "default",
        monthTranslate: ""
    },
    reducers: {
        setPeriodState: (state, {payload}) => {
            state.monthState = payload
            state.monthTranslate = ""
        },
        setPeriodTranslate: (state, {payload}) => {
            state.monthTranslate = payload
        }
    }
})

export const {setPeriodState, setPeriodTranslate} = PeriodSlice.actions