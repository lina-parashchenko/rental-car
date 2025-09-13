import axios from "axios";
const BASE_URL = "https://car-rental-api.goit.global";

export async function getCars() {
  const { data } = await axios.get(`${BASE_URL}/cars`);
  return data;
}
