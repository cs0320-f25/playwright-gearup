import { useState } from "react";
import type { User } from "firebase/auth";

interface Props {
  user: User | null;
  onSignIn: () => Promise<any>;
  onSignOut: () => Promise<any>;
  onUserUpdate?: (user: User | null) => void;
}

export default function LoginButton({ user, onSignIn, onSignOut, onUserUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      if (user) {
        await onSignOut();
        onUserUpdate?.(null);
      } else {
        const result = await onSignIn();
        // signInWithPopup returns a UserCredential; update parent immediately if available
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
