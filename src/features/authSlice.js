import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserService} from "../services/UserService";

const initialState = {
    isLogged: false,
    user: {},
    message: "",
}

export const authThunk = createAsyncThunk(
    "auth/auth",
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

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.fulfilled, (state, action) => {
                state.isLogged = action.payload.isLogged;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
    }
})

export default authSlice.reducer;