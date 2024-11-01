
import {createSlice} from '@reduxjs/toolkit'

const initial={
    dark:false,
    UserData:{}
}

const appSlice=createSlice({
    name:"pdfStrore",
    initialState:initial,
    reducers:{
        setDark:(state)=>{
            state.dark=true
        },
        setWite:(state)=>{
            state.dark=false
        },
        setSystemMode:(state)=>{
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            state.dark = prefersDark;
        }
    }
})

export const {setDark,setWite,setSystemMode}=appSlice.actions;

export default appSlice.reducer;