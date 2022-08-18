import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../redux.interface";

export const EmptyUser: UserInfo = {
    id: '',
    username: '',
    authenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUser,
    reducers: {
        loginAction: (state, action) => {
            return action.payload;
        },
        logoutAction: () => {
            return EmptyUser;
        }
    }
});

export const {loginAction, logoutAction} = userSlice.actions;

export default userSlice.reducer;