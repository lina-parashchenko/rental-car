import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars.items;

export const selectBrands = createSelector([selectCars], (cars) =>
  [...new Set(cars.map((car) => car.make))].map((brand) => ({
    value: brand,
    label: brand,
  }))
);

export const selectPrices = createSelector([selectCars], (cars) =>
  [...new Set(cars.map((car) => car.rentalPrice))].map((price) => ({
    value: price,
    label: price,
  }))
);

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
        console.log("fetchCars pending...");
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else if (action.payload.cars) {
          state.items = action.payload.cars;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("fetchCars rejected:", action.payload);
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
