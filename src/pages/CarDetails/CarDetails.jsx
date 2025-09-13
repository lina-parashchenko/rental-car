import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/carsSlice";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <p>Loading...</p>;

  return (
    <section>
      <h2>
        {car.make} {car.model}
      </h2>
      <img src={car.img} alt={car.make} width="400" />
      <p>{car.description}</p>
      <p>Price: {car.rentalPrice}</p>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>

      <form>
        <h3>Book this car</h3>
        <input type="text" placeholder="Your name" required />
        <input type="tel" placeholder="Phone number" required />
        <button type="submit">Book now</button>
      </form>
    </section>
  );
}
