import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api"

export const myOrders = createAsyncThunk("myOrders", async(userID,{rejectWithValue})=>{
        console.log(userID,"userID action")
        const response = await api.get(`/user-order/${userID}`)
        console.log(response,"response")
        try {
            const result = response.data.data
            console.log(result,"result")
             return result 
        } catch (error) {
            return rejectWithValue(error)
        }
})