import React from "react";

/**
 * Props for the NavBar component.
 * @property {number} totalCounters - The total number of counters with a value greater than zero.
 */
interface NavBarProps {
  totalCounters: number;
}

/**
 * NavBar component for displaying the shopping cart status.
 * @param param0 The props for the component.
 * @returns The rendered NavBar component.
 */
function NavBar({ totalCounters }: NavBarProps) {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">
        <i className="fa fa-shopping-cart fa-lg m-2" aria-hidden="true" />
        <span
          className="badge badge-pill badge-info m-2"
          style={{ width: 50, fontSize: "24px" }}
        >
          {totalCounters}
        </span>
        Items
      </div>
    </nav>
  );
};

export default NavBar;
