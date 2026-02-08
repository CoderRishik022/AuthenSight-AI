import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null,
    unsignedImage: null,
    unsignedClaim: null,
    unsignedPerc: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
        },
        logout: (state) => {
            state.status = false
        },
        loadImage: (state, action) => {
            state.unsignedImage = action.payload.previewUrl
            state.unsignedClaim = action.payload.ansClaim
            state.unsignedPerc = action.payload.ansPerc
        },
        unloadImage: (state) => {
            state.unsignedImage = null
            state.unsignedClaim = null
            state.unsignedPerc = null
        }
    }
})

export const {login,logout, loadImage, unloadImage} = authSlice.actions

export default authSlice.reducer;