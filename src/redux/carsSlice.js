import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// приклад асинхронного запиту (поки фейковий)
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (carId) => {
    const response = await fetch(`/api/cars/${carId}`);
    if (!response.ok) throw new Error("Failed to fetch car");
    return await response.json();
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: { car: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carsSlice.reducer;
