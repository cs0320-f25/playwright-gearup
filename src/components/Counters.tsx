import React from "react";
import Counter from "./counter";

interface CounterType {
  id: number;
  value: number;
}

interface CountersProps {
  counters: CounterType[];
  setCounters: React.Dispatch<React.SetStateAction<CounterType[]>>;
}

function Counters({
  counters,
  setCounters,
}: CountersProps) {

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
    <div>
      <div className="row">
        <div>
          <button
            className="btn btn-success m-2"
            onClick={handleReset}
            disabled={counters.length === 0}
          >
            <i className="fa fa-refresh" aria-hidden="true" />
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={handleRestart}
            disabled={counters.length !== 0}
          >
            <i className="fa fa-recycle" aria-hidden="true" />
          </button>
        </div>
      </div>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          counter={counter}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Counters;
