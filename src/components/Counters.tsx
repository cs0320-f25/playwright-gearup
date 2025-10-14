import React from "react";
import Counter from "./Counter";

/**
 * Represents a counter with an ID and a value.
 * @property {number} id - The unique identifier for the counter.
 * @property {number} value - The current value of the counter.
 */
interface CounterType {
  id: number;
  value: number;
}

/**
 *  Props for the Counters component.
 * @property {CounterType[]} counters - The array of counter data.
 * @property {React.Dispatch<React.SetStateAction<CounterType[]>>} setCounters - State setter for updating counters.
 */
interface CountersProps {
  counters: CounterType[];
  setCounters: React.Dispatch<React.SetStateAction<CounterType[]>>;
}

/**
 * Counters component for managing and displaying multiple counters.
 * @param param0 The props for the component.
 * @returns The rendered Counters component.
 */
function Counters({
  counters,
  setCounters,
}: CountersProps) {

  /**
   * Increments a counter.
   * @param counter The counter to increment.
   */
  const handleIncrement = (counter: Counter) => {
    const updatedCounters: Counter[] = counters.map((c: Counter): Counter =>
      c.id === counter.id ? { ...c, value: c.value + 1 } : c
    );
    setCounters(updatedCounters);
  };

  /**
   * Decrements a counter.
   * @param counter The counter to decrement.
   */
  const handleDecrement = (counter: Counter) => {
    const updatedCounters: Counter[] = counters.map((c: Counter): Counter =>
      c.id === counter.id ? { ...c, value: c.value - 1 } : c
    );
    setCounters(updatedCounters);
  };

  /**
   * Resets all counters to zero.
   */
  const handleReset = () => {
    const resetCounters: Counter[] = counters.map((c: Counter): Counter => ({ ...c, value: 0 }));
    setCounters(resetCounters);
  };

  /**
   * Delete a counter.
   * @param counterId The ID of the counter to delete.
   */
  const handleDelete = (counterId: number) => {
    const filteredCounters: Counter[] = counters.filter((c: Counter) => c.id !== counterId);
    setCounters(filteredCounters);
  };

  /**
   * Handles the restart action by reloading the page.
   */
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
