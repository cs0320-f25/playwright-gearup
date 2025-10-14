import React from "react";
import Counter from "./counter";

interface CounterType {
  id: number;
  value: number;
}

interface CountersProps {
  counters: CounterType[];
  onReset: () => void;
  onRestart: () => void;
  onIncrement: (counter: CounterType) => void;
  onDecrement: (counter: CounterType) => void;
  onDelete: (id: number) => void;
}

function Counters({
  counters,
  onReset,
  onRestart,
  onIncrement,
  onDecrement,
  onDelete,
}: CountersProps) {
  return (
    <div>
      <div className="row">
        <div>
          <button
            className="btn btn-success m-2"
            onClick={onReset}
            disabled={counters.length === 0}
          >
            <i className="fa fa-refresh" aria-hidden="true" />
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={onRestart}
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
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Counters;
