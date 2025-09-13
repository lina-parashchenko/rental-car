import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Тут будуть рендеритися всі сторінки */}
      </main>
    </>
  );
}
