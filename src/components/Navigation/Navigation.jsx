import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const activeElement = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={activeElement}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={activeElement}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
