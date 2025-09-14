import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/carsSlice";
import CarCardSmall from "../../components/Catalog/CarCardSmall/CarCardSmall";
import styles from "./Catalog.module.css";
import Filters from "../../components/Catalog/Filters/Filters";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items) || [];
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

  const filteredCars = cars.filter((car) => {
    const priceNum = Number(car.rentalPrice.replace("$", ""));
    if (filters.brand && car.make.toLowerCase() !== filters.brand.toLowerCase())
      return false;
    if (filters.price && priceNum > filters.price) return false;
    if (filters.from && car.mileage < filters.from) return false;
    if (filters.to && car.mileage > filters.to) return false;
    return true;
  });

  return (
    <section>
      <Filters onFilter={setFilters} />
      <div className={styles.catalogGrid}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCardSmall key={car.id} car={car} />)
        ) : (
          <p>No cars found with selected filters</p>
        )}
      </div>
    </section>
  );
}
