import { createSlice } from "@reduxjs/toolkit"

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = "checking"
            state.user = {}
            state.errorMessage = undefined
        },
        onLogIn: (state, {payload}) => {
            state.status = "authenticated"
            state.user = payload
            state.errorMessage = undefined
        },
        onLogOut: (state, {payload}) => {
            state.status = "not-authenticated"
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
})

export const {onChecking, onLogIn, onLogOut, clearErrorMessage} = AuthSlice.actions