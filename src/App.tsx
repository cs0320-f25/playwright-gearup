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

function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

function signOutUser() {
  return signOut(auth);
}

interface Counter {
  id: string;
  value: number;
}
const defaultCounters: Counter[] = [
  { id: "1", value: 0 },
  { id: "2", value: 0 },
  { id: "3", value: 0 },
  { id: "4", value: 0 },
];

function App() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const remoteCounters = await getRemoteCounters(currentUser.uid);

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
          {user && (
            <div>
              <div className="greeting"> Hi {user.displayName}!</div>
              <div className="status" style={{ display: "grid", placeItems: "center", gap: "0.25rem", textAlign: "center" }}> {pendingWrites > 0 ? `Saving... (${pendingWrites} pending)` : "Saved"}</div>
            </div>
          )}
          <div>
            <NavBar totalCounters={counters.filter((c) => c.value > 0).length} />
            <Counters
              counters={counters}
              setCounters={setCounters}
              pendingWrites={pendingWrites}
              setPendingWrites={setPendingWrites}
              user={user}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
