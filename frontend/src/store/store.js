import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./auth/AuthSlice"
import { PeriodSlice } from "./auth/PeriodSlice"

export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer,
        Period: PeriodSlice.reducer
    }
})