import { createSelector } from "@reduxjs/toolkit";

// усі машини
export const selectCars = (state) => state.cars.items;

// унікальні бренди (для селекта)
export const selectBrands = createSelector([selectCars], (cars) =>
  [...new Set(cars.map((car) => car.brand))].map((brand) => ({
    value: brand,
    label: brand,
  }))
);

// унікальні ціни (для селекта)
export const selectPrices = createSelector([selectCars], (cars) =>
  [...new Set(cars.map((car) => Number(car.rentalPrice.replace("$", ""))))]
    .sort((a, b) => a - b)
    .map((price) => ({
      value: price,
      label: `$${price}`,
    }))
);
