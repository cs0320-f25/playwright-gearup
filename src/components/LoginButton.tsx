import { useState } from "react";
import type { User } from "firebase/auth";

/**
 * Props for the LoginButton component.
 * @property {User | null} user - The current authenticated user, null if not signed in.
 * @property {() => Promise<any>} onSignIn - Function to handle user sign-in.
 * @property {() => Promise<any>} onSignOut - Function to handle user sign-out.
 * @property {(user: User | null) => void} [onUserUpdate] - Optional callback for user state updates.
 */
interface Props {
  user: User | null;
  onSignIn: () => Promise<any>;
  onSignOut: () => Promise<any>;
  onUserUpdate?: (user: User | null) => void;
}

/**
 * LoginButton component for signing in and out users.
 * @param param0 The props for the component.
 * @returns The rendered LoginButton component.
 */
export default function LoginButton({ user, onSignIn, onSignOut, onUserUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Click handler for the login button. Manages sign-in and sign-out processes.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   */
  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      if (user) {
        await onSignOut();
        onUserUpdate?.(null);
      } else {
        const result = await onSignIn();
        if (result && (result as any).user) {
          onUserUpdate?.((result as any).user as User);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={loading} aria-busy={loading} className="btn btn-success m-2" id="login-button">
        {loading ? "Please wait…" : user ? "Sign out" : "Sign in with Google"}
      </button>
      {error && (
        <div role="alert">
          {error}
        </div>
      )}
    </>
  );
}
