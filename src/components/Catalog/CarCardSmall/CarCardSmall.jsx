import styles from "./CardCarSmall.module.css";

export default function CarCardSmall({ car }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={car.img}
        alt={`${car.make} ${car.model}`}
      />
      <h3 className={styles.title}>
        {car.make} {car.model}, {car.year}
      </h3>
      <p className={styles.price}>{car.rentalPrice}</p>
      <button className={styles.button}>Learn more</button>
    </div>
  );
}
