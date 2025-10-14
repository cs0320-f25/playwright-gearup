import React, { useState } from "react";
import NavBar from "./components/Navbar";
import Counters from "./components/Counters";

/**
 * Represents a counter with an ID and a value.
 * @property {number} id - The unique identifier for the counter.
 * @property {number} value - The current value of the counter.
 */
interface Counter {
  id: number;
  value: number;
}

/**
 * App component for managing the counter application.
 * @returns The rendered App component.
 */
function App() {
  const [counters, setCounters] = useState<Counter[]>([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  return (
    <div className="main__wrap">
      <main className="container">
        <div className="card__box">
          <NavBar totalCounters={counters.filter((c) => c.value > 0).length} />
          <Counters
            counters={counters}
            setCounters={setCounters}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
