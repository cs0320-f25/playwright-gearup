import React from "react";
import type { User } from "firebase/auth";
import {
  incrementCounter,
  decrementCounter,
  deleteCounter,
  resetCounters,
} from "../services/counters";
import Counter from "./Counter";

/**
 * Represents a counter with an ID and a value.
 * @property {string} id - The unique identifier for the counter.
 * @property {number} value - The current value of the counter.
 */
interface CounterType {
  id: string;
  value: number;
}

/**
 * Props for the Counters component.
 * @property {CounterType[]} counters - The list of counters.
 * @property {React.Dispatch<React.SetStateAction<CounterType[]>>} setCounters - Setter for the counters state.
 * @property {number} pendingWrites - The number of pending writes.
 * @property {React.Dispatch<React.SetStateAction<number>>} setPendingWrites - Setter for the pending writes state.
 * @property {User} user - The current authenticated user.
 */
interface CountersProps {
  counters: CounterType[];
  setCounters: React.Dispatch<React.SetStateAction<CounterType[]>>;
  pendingWrites: number;
  setPendingWrites: React.Dispatch<React.SetStateAction<number>>;
  user: User;
}

/**
 * Counters component for displaying and managing a list of counters.
 * @param CountersProps The props for the component.
 * @returns The rendered Counters component.
 */
function Counters({
  counters,
  setCounters,
  pendingWrites,
  setPendingWrites,
  user
}: CountersProps) {
  
  /**
   * Handler for incrementing a counter. Increments the counter value locally and in Firestore.
   * @param counter The counter to increment.
   */
  const handleIncrement = (counter: CounterType) => {
    setCounters((prev) => prev.map((c) => (c.id === counter.id ? { ...c, value: c.value + 1 } : c)));
    setPendingWrites((p) => p + 1);
    incrementCounter(user.uid, counter.id)
      .catch((err: any) => console.error("incrementCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  /**
   * Handler for decrementing a counter. Decrements the counter value locally and in Firestore.
   * @param counter The counter to decrement.
   */
  const handleDecrement = (counter: CounterType) => {
    setCounters((prev) => prev.map((c) => (c.id === counter.id ? { ...c, value: c.value - 1 } : c)));
    setPendingWrites((p) => p + 1);
    decrementCounter(user.uid, counter.id)
      .catch((err: any) => console.error("decrementCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  /**
   * Handler for resetting all counters to zero. Resets counters locally and in Firestore.
   */
  const handleReset = () => {
    setCounters((prev) => prev.map((c) => ({ ...c, value: 0 })));
    setPendingWrites((p) => p + 1);
    resetCounters(user.uid)
      .catch((err: any) => console.error("resetCounters failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  /**
   * Handler for deleting a counter. Removes the counter locally and in Firestore.
   * @param counterId The ID of the counter to delete.
   */
  const handleDelete = (counterId: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== counterId));
    setPendingWrites((p) => p + 1);
    deleteCounter(user.uid, counterId)
      .catch((err: any) => console.error("deleteCounter failed:", err?.code, err?.message))
      .finally(() => setPendingWrites((p) => p - 1));
  };

  /**
   * Handler for restarting counters. Recreates default counters locally and in Firestore.
   */
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
