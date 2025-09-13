import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters({ onFilter }) {
  const [localFilters, setLocalFilters] = useState({
    brand: "",
    price: "",
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(localFilters); // передаємо наверх тільки після Search
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <select name="brand" value={localFilters.brand} onChange={handleChange}>
        <option value="">Choose a brand</option>
        {/* Тут будуть бренди з API */}
        <option value="Buick">Buick</option>
        <option value="Volvo">Volvo</option>
        <option value="Subaru">Subaru</option>
      </select>

      <select name="price" value={localFilters.price} onChange={handleChange}>
        <option value="">Choose a price</option>
        <option value="30">до $30</option>
        <option value="40">до $40</option>
        <option value="50">до $50</option>
        <option value="60">до $60</option>
      </select>

      <input
        type="number"
        name="from"
        placeholder="From"
        value={localFilters.from}
        onChange={handleChange}
      />

      <input
        type="number"
        name="to"
        placeholder="To"
        value={localFilters.to}
        onChange={handleChange}
      />

      <button type="submit">Search</button>
    </form>
  );
}
