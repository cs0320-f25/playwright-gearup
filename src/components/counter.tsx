import React from "react";
export interface Counter {
  id: string;
  value: number;
}

interface CounterProps {
  counter: Counter;
  onIncrement: (counter: Counter) => void;
  onDecrement: (counter: Counter) => void;
  onDelete: (id: string) => void;
}

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
