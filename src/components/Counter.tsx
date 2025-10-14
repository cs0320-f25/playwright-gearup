import React from "react";

/**
 * Represents a counter with an ID and a value.
 * @property {string} id - The unique identifier for the counter.
 * @property {number} value - The current value of the counter.
 */
export interface Counter {
  id: string;
  value: number;
}

/**
 * Props for the Counter component.
 * @property {Counter} counter - The counter data.
 * @property {(counter: Counter) => void} onIncrement - Handler for incrementing the counter.
 * @property {(counter: Counter) => void} onDecrement - Handler for decrementing the counter.
 * @property {(id: string) => void} onDelete - Handler for deleting the counter.
 */
interface CounterProps {
  counter: Counter;
  onIncrement: (counter: Counter) => void;
  onDecrement: (counter: Counter) => void;
  onDelete: (id: string) => void;
}

/**
 * Counter component for displaying and managing a single counter.
 * @param param0 The props for the component.
 * @returns The rendered Counter component.
 */
function Counter({ counter, onIncrement, onDecrement, onDelete }: CounterProps) {
  function getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  function formatCount() {
    return counter.value === 0 ? "Zero" : counter.value;
  }

  return (
    <div>
      <div className="row">
        <div>
          <span style={{ fontSize: 24 }} className={getBadgeClasses()}>
            {formatCount()}
          </span>
        </div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => onIncrement(counter)}
          >
            <i className="fa fa-plus-circle" aria-hidden="true" />
          </button>
          <button
            className="btn btn-info m-2"
            onClick={() => onDecrement(counter)}
            disabled={counter.value === 0}
          >
            <i className="fa fa-minus-circle" aria-hidden="true" />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(counter.id)}
          >
            <i className="fa fa-trash-o" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
