import styles from "./CarCard.module.css";

export default function CarCard({ car }) {
  return (
    <div className={styles.carcCard}>
      <img src={car.img} alt={`${car.make} ${car.model}`} />

      <div className={styles.carIinfo}>
        <h2>
          {car.make} {car.model}, {car.year}
        </h2>
        <p className="price">${car.rentalPrice}</p>
        <p>{car.description}</p>

        <h3>Rental Conditions:</h3>
        <ul>
          <li>Minimum age: {car.rentalConditions.minAge}</li>
          <li>Security deposit required</li>
          <li>Valid driver’s license</li>
        </ul>

        <h3>Car Specifications:</h3>
        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel Consumption: {car.fuelConsumption}</li>
          <li>Engine Size: {car.engineSize}</li>
        </ul>

        <h3>Accessories and functionalities:</h3>
        <ul>
          {car.accessories.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Booking date" />
          <textarea placeholder="Comment"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
