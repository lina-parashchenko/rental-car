import Filters from "../Filters/Filters";
import CarCardSmall from "../CarCardSmall/CarCardSmall"; // картка авто

import styles from "./Catalog.module.css";

export default function Catalog({ cars }) {
  return (
    <div className={styles.catalog}>
      {/* блок з фільтрами */}
      <Filters />

      {/* сітка карток */}
      <div className={styles.cardsGrid}>
        {cars && cars.length > 0 ? (
          cars.map((car) => <CarCardSmall key={car.id} car={car} />)
        ) : (
          <p>Немає авто за вибраними параметрами</p>
        )}
      </div>

      {/* кнопка load more */}
      <div className={styles.loadMore}>
        <button>Load more</button>
      </div>
    </div>
  );
}
