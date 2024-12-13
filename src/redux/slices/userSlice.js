import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        mobile: '',
        address: '',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setMobile: (state, action) => {
            state.mobile = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.mobile = '';
            state.address = '';
        },
    },
});

export const { setName, setEmail, setMobile, setAddress, resetUser } = userSlice.actions;
export default userSlice.reducer;
