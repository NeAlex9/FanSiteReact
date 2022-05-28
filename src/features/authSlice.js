import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserService} from "../services/UserService";
import {AuthenticationService} from "../services/AuthenticationService";

const initialState = {
    isLogged: false,
    user: {},
    message: "",
}

export const authThunk = createAsyncThunk(
    "auth/authenticate",
    async (parameters) => {
        const authResponse = {isLogged: false, message: null, user: null};
        const response = await parameters.authFunc(parameters.data);
        try {
            if (response.status !== 200) {
                return {...authResponse, message: parameters.errorMessages.failedMessage};
            }

            const userService = new UserService();
            const user = await userService.GetUserByEmail(parameters.data.email);
            return {...authResponse, isLogged: true, message: "Success", user: user};
        } catch (e) {
            return {...authResponse, message: parameters.errorMessages.unexpectedMessage};
        }
    }
);

export const logOutThunk = createAsyncThunk(
    "auth/logOut",
    async () => {
        let authService = new AuthenticationService();
        try {
            const response = await authService.logOut();
            if (response.status !== 200) {
                return {result: false};
            }

            return {result: true, isLogged: false, user: {}, message: "",};
        } catch (e) {
            console.log(e);
            return {result: false};
        }
    }
)

const assignToState = (state, payload) => {
    state.isLogged = payload.isLogged;
    state.user = payload.user;
    state.message = payload.message;
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.fulfilled, (state, action) => {
                assignToState(state, action.payload);
            })
            .addCase(logOutThunk.fulfilled, (state, action) => {
                if (action.payload.result) {
                    assignToState(state, action.payload);
                }
            })
    }
})

export default authSlice.reducer;