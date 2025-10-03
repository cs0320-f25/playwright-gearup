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

  const handleIncrement = (counter: Counter) => {
    const updatedCounters: Counter[] = counters.map((c: Counter): Counter =>
      c.id === counter.id ? { ...c, value: c.value + 1 } : c
    );
    setCounters(updatedCounters);
  };

  const handleDecrement = (counter: Counter) => {
    const updatedCounters: Counter[] = counters.map((c: Counter): Counter =>
      c.id === counter.id ? { ...c, value: c.value - 1 } : c
    );
    setCounters(updatedCounters);
  };

  const handleReset = () => {
    const resetCounters: Counter[] = counters.map((c: Counter): Counter => ({ ...c, value: 0 }));
    setCounters(resetCounters);
  };

  const handleDelete = (counterId: number) => {
    const filteredCounters: Counter[] = counters.filter((c: Counter) => c.id !== counterId);
    setCounters(filteredCounters);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div className="card__box">
          <NavBar totalCounters={counters.filter((c) => c.value > 0).length} />
          <Counters
            counters={counters}
            onReset={handleReset}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
            onRestart={handleRestart}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
