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
        login: (state, action) => {
            return action.payload;
        },
        logout: () => {
            return EmptyUser;
        }
    }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;