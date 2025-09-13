import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/carsSlice";
import CarCardSmall from "../../components/Catalog/CarCardSmall/CarCardSmall";
import styles from "./Catalog.module.css";
import Filters from "../../components/Catalog/Filters/Filters";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items);
  const loading = useSelector((state) => state.cars.loading);
  const error = useSelector((state) => state.cars.error);

  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // унікальні бренди з бази
  const brands = [...new Set(cars.map((car) => car.make))];

  // застосування фільтрів
  const filteredCars = cars.filter((car) => {
    if (filters.brand && car.make !== filters.brand) return false;
    if (
      filters.price &&
      Number(car.rentalPrice.replace("$", "")) > filters.price
    )
      return false;
    if (filters.from && car.mileage < filters.from) return false;
    if (filters.to && car.mileage > filters.to) return false;
    return true;
  });

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section>
      <Filters brands={brands} onFilter={setFilters} />
      <h2>Catalog</h2>
      <div className={styles.catalogGrid}>
        {filteredCars.map((car) => (
          <CarCardSmall key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
