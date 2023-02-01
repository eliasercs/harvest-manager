import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./auth/AuthSlice"
import { PeriodSlice } from "./auth/PeriodSlice"
import { PaginationSlice } from "./pagination/PaginationSlice"

export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer,
        Period: PeriodSlice.reducer,
        Pagination: PaginationSlice.reducer
    }
})