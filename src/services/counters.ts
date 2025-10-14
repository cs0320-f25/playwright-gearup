// counters.ts
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  increment as firestoreIncrement,
  getDocs,
} from "firebase/firestore";

export interface Counter {
  id: string;
  value: number;
}

function ensureUid(uid: string) {
  if (!uid || typeof uid !== "string") throw new Error("Invalid uid");
}

function ensureId(id: string) {
  if (!id || typeof id !== "string") throw new Error("Invalid counter id");
}

export async function getRemoteCounters(uid: string): Promise<Counter[]> {
  ensureUid(uid);
  try {
    const col = collection(db, "users", uid, "counters");
    const snap = await getDocs(col);
    return snap.docs.map((d) => ({
      id: d.id,
      value: (d.data() as any).value ?? 0,
    }));
  } catch (err: any) {
    console.error("getRemoteCounters error:", err?.code ?? "no-code", err?.message ?? err);
    throw err;
  }
}

export async function createDefaultCounters(uid: string, defaultCounters: Counter[]) {
  for (const c of defaultCounters) {
    await setDoc(doc(db, "users", uid, "counters", c.id), { value: c.value });
  }
}    

export async function incrementCounter(uid: string, id: string) {
  ensureUid(uid);
  ensureId(id);
  try {
    const ref = doc(db, "users", uid, "counters", id);
    // Safe increment: creates doc if missing
    return await setDoc(ref, { value: firestoreIncrement(1) }, { merge: true });
  } catch (err: any) {
    console.error("incrementCounter error:", { uid, id, code: err?.code, message: err?.message });
    throw err;
  }
}

export async function decrementCounter(uid: string, id: string) {
  ensureUid(uid);
  ensureId(id);
  try {
    const ref = doc(db, "users", uid, "counters", id);
    return await setDoc(ref, { value: firestoreIncrement(-1) }, { merge: true });
  } catch (err: any) {
    console.error("decrementCounter error:", { uid, id, code: err?.code, message: err?.message });
    throw err;
  }
}

export async function deleteCounter(uid: string, id: string) {
  ensureUid(uid);
  ensureId(id);
  try {
    const ref = doc(db, "users", uid, "counters", id);
    return await deleteDoc(ref);
  } catch (err: any) {
    console.error("deleteCounter error:", { uid, id, code: err?.code, message: err?.message });
    throw err;
  }
}

export async function resetCounters(uid: string) {
  ensureUid(uid);
  try {
    const col = collection(db, "users", uid, "counters");
    const snap = await getDocs(col);
    const batch = writeBatch(db);
    snap.forEach((d) => batch.set(d.ref, { value: 0 }, { merge: true }));
    return await batch.commit();
  } catch (err: any) {
    console.error("resetCounters error:", { uid, code: err?.code, message: err?.message });
    throw err;
  }
}
