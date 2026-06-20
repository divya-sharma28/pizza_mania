import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../api";

export const addtoCart = createAsyncThunk("addToCart",async(payload,{rejectWithValue})=>{
    // console.log(payload.id,"payloadID")
    const response = await api.post(`/add-to-cart/${payload.id}`,payload)
    // console.log(response,"response")

    try {
        const result = response.data.data
        // console.log(result,"result")
        return result

    }  catch (error) {
        return rejectWithValue(error)
    }  
} )

export const getCart = createAsyncThunk("getCart",async(args,{rejectWithValue})=>{
    const response = await api.get(`/cart`)
    try {
        const result = response.data.data
        return result

    }  catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteItem = createAsyncThunk("deleteItem", async(id, {rejectWithValue})=>{
    const response = await api.delete(`/delete-item/${id}`)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateQuantity = createAsyncThunk("updateQuantity", async(payload, {rejectWithValue })=>{
    const response = await api.patch(`/update-item/${payload._id}`,payload)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

export const checkout = createAsyncThunk("checkout", async(payload, {rejectWithValue})=>{
    
     const response = await api.post(`/order`,payload)
     const key= await api.get('/getkey')
     try{
        const result = response.data.data

        // console.log(response)
        const options = {
            key: key.data.key, // Enter the Key ID generated from the Dashboard
            amount: payload.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Pizza Mania",
            description: "Razorpay Transaction",
            image: "https://cdn.razorpay.com/logos/MBGIR4aTtrWckU_medium.png",
            order_id: result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            userID: result.userID,
            callback_url: `${import.meta.env.VITE_BASE_URL}/pizza-mania/payment`,
            prefill: {
                name: payload.userName,
                email: payload.email,
            },
            notes: {
                address: "Pizza Mania pvt ltd"
            },
            theme: {
                color: "#ffee00" 
            },
        };
        var razor = new window.Razorpay(options);
        razor.open();

        console.log(result,"result")
        return result
         
     }
     catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})