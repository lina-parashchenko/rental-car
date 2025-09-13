import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// отримати всі авто
export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://car-rental-api.goit.global/cars");
      if (!response.ok) throw new Error("Failed to fetch cars");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// отримати одне авто за id
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (carId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://car-rental-api.goit.global/cars/${carId}`
      );
      if (!response.ok) throw new Error("Failed to fetch car");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: { items: [], car: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        // 👇 API повертає об'єкт, тому дістаємо саме масив
        state.items = action.payload.cars;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch by id
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;
