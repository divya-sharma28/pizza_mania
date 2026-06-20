import axios from "axios"
import {createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../api"

export const getPizza = createAsyncThunk("getPizza", async(args,{rejectWithValue})=>{

    const response = await api.get(`/get-pizza`)
        try {
            const result = response.data.data
            return result
        } catch (error) {
            return rejectWithValue(error)
        }  
}) 
