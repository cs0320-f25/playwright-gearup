import React, { useState } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

interface Counter {
  id: number;
  value: number;
}

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
