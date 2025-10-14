import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Counters from "./components/Counters";
import { getRemoteCounters, createDefaultCounters } from "./services/counters";
import LoginButton from "./components/LoginButton";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

/**
 * Signs in the user with Google authentication.
 * @returns A promise that resolves with the result of the sign-in operation.
 */
function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

/**
 * Signs out the user from Google authentication.
 * @returns A promise that resolves with the result of the sign-out operation.
 */
function signOutUser() {
  return signOut(auth);
}

/**
 * Counter interface representing a single counter's state.
 * @property {string} id - The unique identifier for the counter.
 * @property {number} value - The current value of the counter.
 */
interface Counter {
  id: string;
  value: number;
}

// Default counters to initialize for new users
const defaultCounters: Counter[] = [
  { id: "1", value: 0 },
  { id: "2", value: 0 },
  { id: "3", value: 0 },
  { id: "4", value: 0 },
];

/**
 * Main application component.
 * @returns The rendered App component.
 */
function App() {

  // Listener to catch when a user logs in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If they log in, try to load their previous counters
      if (currentUser) {
        try {
          const remoteCounters = await getRemoteCounters(currentUser.uid);
          
          // If the counters exist, we set them. Otherwise we set up defaults
          if (remoteCounters.length > 0) {
            setCounters(remoteCounters);
          } else {
            await createDefaultCounters(currentUser.uid, defaultCounters);
            setCounters(defaultCounters);
          }

        } catch (err) {
          console.error("Failed to load counters:", err);
          setCounters(defaultCounters);
        }
      } else {
        setCounters(defaultCounters);
      }
    });
    return unsubscribe;
  }, []);


  // The current user, null if not signed in
  const [user, setUser] = useState<User | null>(null);
  // The list of counters
  const [counters, setCounters] = useState<Counter[]>(defaultCounters);
  // Pending writes to firestore
  const [pendingWrites, setPendingWrites] = useState(0);

  return (
    <div className="main__wrap">
      <main className="container">
        <div className="card__box">
          <LoginButton user={user} onSignIn={signInWithGoogle} onSignOut={signOutUser} onUserUpdate={setUser} />
          {/* We only show the counters, greeting, and status if the user is logged in */}
          {user && (
            <div>
              <div className="greeting"> Hi {user.displayName}!</div>
              <div className="status" style={{ display: "grid", placeItems: "center", gap: "0.25rem", textAlign: "center" }}> {pendingWrites > 0 ? `Saving... (${pendingWrites} pending)` : "Saved"}</div>
              <NavBar totalCounters={counters.filter((c) => c.value > 0).length} />
              <Counters
                counters={counters}
                setCounters={setCounters}
                pendingWrites={pendingWrites}
                setPendingWrites={setPendingWrites}
                user={user}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
