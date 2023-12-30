import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    error: null
}

export const productsFetch = createAsyncThunk(
    "Products Slice/productsFetch",
    async (id = null, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/products")
            return response?.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const productsSlice = createSlice({
    name: "Products Slice",
    initialState,
    reducers: {

    },
    extraReducers:
    (builder) => {
        builder.addCase(productsFetch.pending, (state, action) => {
            state.status = "pending";
        })
        builder.addCase(productsFetch.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
        })
        builder.addCase(productsFetch.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
    }
});

export default productsSlice.reducer;