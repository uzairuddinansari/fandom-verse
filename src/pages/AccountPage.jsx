import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Eye, EyeOff } from "lucide-react";
import Breadcrumbs from "../components/fandom/Breadcrumbs";
import "../styles/Fandom.css";

/* Login / Signup are UI only (SRS): nothing is authenticated, sent or stored. */
export default function AccountPage() {
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") === "signup" ? "signup" : "login";
  const [complete, setComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = (next) => {
    setComplete(false);
    setParams(next === "signup" ? { mode: "signup" } : {});
  };

  return (
    <main className="fv-page">
      <div className="fv-container">
        <Breadcrumbs trail={[{ label: mode === "login" ? "Log in" : "Sign up" }]} />
        <section className="fv-panel fv-account">
          <div className="fv-account-tabs" role="tablist" aria-label="Account">
            <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")}>Log in</button>
            <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => switchMode("signup")}>Sign up</button>
          </div>

          <h1>{mode === "login" ? "Welcome back." : "Join the Verse."}</h1>
          <p className="fv-muted">
            {mode === "login" ? "Log in to sync your bookmarks (demo)." : "Create a free fan profile (demo)."}
          </p>

          {complete ? (
            <div className="fv-success fv-account-done" role="status">
              <Check size={22} />
              <div>
                <strong>{mode === "login" ? "You’re logged in (demo)." : "Account created (demo)."}</strong>
                <p>This is a UI-only demonstration — no account exists and no details were stored.</p>
                <Link to="/">Continue exploring →</Link>
              </div>
            </div>
          ) : (
            <form
              className="fv-form"
              onSubmit={(event) => {
                event.preventDefault();
                setComplete(true);
              }}
            >
              {mode === "signup" && (
                <label>
                  <span>Display name</span>
                  <input required autoComplete="nickname" />
                </label>
              )}
              <label>
                <span>Email</span>
                <input required type="email" autoComplete="email" />
              </label>
              <label>
                <span>Password</span>
                <div className="fv-password">
                  <input required minLength={6} type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>
              {mode === "signup" && (
                <label className="fv-check">
                  <input required type="checkbox" /> <span>I agree to the community guidelines.</span>
                </label>
              )}
              <button type="submit" className="fv-button">{mode === "login" ? "Log in" : "Create account"}</button>
            </form>
          )}
          <small className="fv-muted">Demo only: this form performs no authentication and sends no data.</small>
        </section>
      </div>
    </main>
  );
}
