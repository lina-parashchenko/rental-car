import { useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { selectBrands, selectPrices } from "../../../redux/carsSelectors";
import styles from "./Filters.module.css";

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "44px",
    width: "204px",
    border: state.isFocused ? "1.5px solid #3470FF" : "1px solid #d9d9d9",
    borderRadius: "12px",
    fontWeight: 500,
    fontFamily: "Manrope, sans-serif",
    fontSize: "16px",
    lineHeight: 1.25,
    color: "#101828",
    background: "#f7f7f7",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(52, 112, 255, 0.15)" : "none",
    "&:hover": { borderColor: "#3470FF" },
    minHeight: "unset",
  }),
  valueContainer: (provided) => ({ ...provided, padding: "0 12px" }),
  input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
  indicatorsContainer: (provided) => ({ ...provided, height: "auto" }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    padding: "8px",
    boxShadow:
      "0 0 1px 0 rgba(0, 0, 0, 0.4), 0 8px 24px -6px rgba(0, 0, 0, 0.16)",
    background: "#fff",
    marginTop: "4px",
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "10px 12px",
    borderRadius: "4px",
    backgroundColor: state.isFocused ? "#f5f5f5" : "#fff",
    color: "#000",
    cursor: "pointer",
    "&:active": { backgroundColor: "#e6e6e6" },
  }),
};

export default function Filters({ onFilter }) {
  const brands = useSelector(selectBrands);
  const prices = useSelector(selectPrices);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleSearch = () => {
    onFilter({
      brand: selectedBrand ? selectedBrand.value : "",
      price: selectedPrice ? Number(selectedPrice.value) : "",
      from: mileageFrom ? Number(mileageFrom) : "",
      to: mileageTo ? Number(mileageTo) : "",
    });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.labelInput}>
        <p className={styles.mileageLabel}>Car brand</p>
        <Select
          options={brands}
          styles={customSelectStyles}
          placeholder="Choose a brand"
          onChange={setSelectedBrand}
        />
      </div>

      <div className={styles.labelInput}>
        <p className={styles.mileageLabel}>Price/hour</p>
        <Select
          options={prices}
          styles={customSelectStyles}
          placeholder="Choose a price"
          onChange={setSelectedPrice}
        />
      </div>

      <div className={styles.labelInput}>
        <p className={styles.mileageLabel}>Car mileage / km</p>
        <div className={styles.mileage}>
          <input
            type="number"
            placeholder="From"
            className={styles.input}
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className={styles.input}
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
