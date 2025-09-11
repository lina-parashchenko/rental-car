import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/carsSlice";
import { Link } from "react-router-dom";

export default function Catalog() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items);

  useEffect(() => {
    dispatch(fetchCars()); // при завантаженні сторінки тягнемо авто
  }, [dispatch]);

  return (
    <section>
      <h2>Catalog</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <h3>
              {car.make} {car.model}
            </h3>
            <p>Price: {car.rentalPrice}</p>
            <p>Mileage: {car.mileage.toLocaleString()} km</p>
            <Link to={`/catalog/${car.id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
