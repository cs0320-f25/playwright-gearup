import React from "react";
import type { User } from "firebase/auth";

import {
  incrementCounter,
  decrementCounter,
  deleteCounter,
  resetCounters,
} from "../services/counters";
import Counter from "./Counter";

interface CounterType {
  id: string;
  value: number;
}

interface CountersProps {
  counters: CounterType[];
  setCounters: React.Dispatch<React.SetStateAction<CounterType[]>>;
  pendingWrites: number;
  setPendingWrites: React.Dispatch<React.SetStateAction<number>>;
  user: User;
}

function Counters({
  counters,
  setCounters,
  pendingWrites,
  setPendingWrites,
  user
}: CountersProps) {
  
  const handleIncrement = (counter: CounterType) => {
    setCounters((prev) => prev.map((c) => (c.id === counter.id ? { ...c, value: c.value + 1 } : c)));
    setPendingWrites((p) => p + 1);
    incrementCounter(user.uid, counter.id)
      .catch((err: any) => console.error("incrementCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  const handleDecrement = (counter: CounterType) => {
    setCounters((prev) => prev.map((c) => (c.id === counter.id ? { ...c, value: c.value - 1 } : c)));
    setPendingWrites((p) => p + 1);
    decrementCounter(user.uid, counter.id)
      .catch((err: any) => console.error("decrementCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  const handleReset = () => {
    setCounters((prev) => prev.map((c) => ({ ...c, value: 0 })));
    setPendingWrites((p) => p + 1);
    resetCounters(user.uid)
      .catch((err: any) => console.error("resetCounters failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  const handleDelete = (counterId: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== counterId));
    setPendingWrites((p) => p + 1);
    deleteCounter(user.uid, counterId)
      .catch((err: any) => console.error("deleteCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  const handleRestart = () => {
    setCounters([
      { id: "1", value: 0 },
      { id: "2", value: 0 },
      { id: "3", value: 0 },
      { id: "4", value: 0 },
    ]);

    setPendingWrites((p) => p + 1);
    resetCounters(user.uid)
      .catch((err) => console.error("Failed to reset counters in Firestore:", err))
      .finally(() => setPendingWrites((p) => p - 1));
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
            // Notice the disabled here...
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
