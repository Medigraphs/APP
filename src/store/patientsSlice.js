import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
//Action
export const fetchPatients = createAsyncThunk("fetchPatients", async () => {
    try {
        const patientsCollection = await getDocs(collection(db, 'patients'));
        const patientList = patientsCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(patientList);
        return patientList;
    } catch (error) {
        console.error('Error fetching patients:', error);
        return error;
    }

})

const patientsSlice = createSlice({
    name: "patients",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPatients.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(fetchPatients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(fetchPatients.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default patientsSlice.reducer;