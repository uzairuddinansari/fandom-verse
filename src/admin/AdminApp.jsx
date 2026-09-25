import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bot,
  ExternalLink,
  FilePlus2,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Palette,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import logo from "../assets/Nav/Nav_logo.png";
import { DEMO_CREDENTIALS, isAdminSignedIn, signInAdmin, signOutAdmin } from "./adminStore";
import Dashboard from "./Dashboard";
import ContentManager from "./ContentManager";
import ContentEditor from "./ContentEditor";
import AnalyticsPage from "./AnalyticsPage";
import ChatbotManager from "./ChatbotManager";
import AppearancePage from "./AppearancePage";
import SettingsPage from "./SettingsPage";
import "../styles/Admin.css";

const menu = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/content", label: "Content", icon: Layers, end: true },
  { to: "/admin/content/new", label: "Add content", icon: FilePlus2 },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { to: "/admin/appearance", label: "Appearance", icon: Palette },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  if (isAdminSignedIn()) return <Navigate to={location.state?.from || "/admin"} replace />;

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (signInAdmin(form.get("username"), form.get("password"))) navigate(location.state?.from || "/admin", { replace: true });
    else setError("Incorrect username or password.");
  };

  return (
    <main className="adm-login">
      <section className="adm-login-card">
        <Link to="/" className="adm-login-logo"><img src={logo} alt="FandomVerse" /></Link>
        <span className="adm-eyebrow"><ShieldCheck size={14} /> Admin control centre</span>
        <h1>Sign in</h1>
        <p>Manage content, the chatbot, appearance and site analytics.</p>
        <form onSubmit={submit} className="adm-form">
          <label>
            <span>Username</span>
            <input name="username" autoComplete="username" required defaultValue="" />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && <p className="adm-error" role="alert">{error}</p>}
          <button type="submit" className="adm-btn adm-btn-primary">Sign in</button>
        </form>
        <div className="adm-login-hint">
          <strong>Demo access</strong>
          <span>Username <code>{DEMO_CREDENTIALS.username}</code> · Password <code>{DEMO_CREDENTIALS.password}</code></span>
          <small>Front-end demo only — there is no server, so this is not real security.</small>
        </div>
      </section>
      <aside className="adm-login-art" aria-hidden="true">
        <div>
          <strong>7</strong><span>fandom hubs</span>
        </div>
        <div>
          <strong>300+</strong><span>content items</span>
        </div>
        <div>
          <strong>0</strong><span>servers needed</span>
        </div>
      </aside>
    </main>
  );
}

function RequireAdmin() {
  const location = useLocation();
  if (!isAdminSignedIn()) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <AdminLayout />;
}

function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [drawer, setDrawer] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const current = [...menu].reverse().find((item) => (item.end ? pathname === item.to : pathname.startsWith(item.to)));

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const logout = () => {
    signOutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className={`adm ${drawer ? "drawer-open" : ""}`}>
      <aside className="adm-sidebar" aria-label="Admin navigation">
        <div className="adm-brand">
          <img src={logo} alt="" />
          <div>
            <strong>FandomVerse</strong>
            <small>Admin</small>
          </div>
          <button type="button" className="adm-icon-btn adm-drawer-close" onClick={() => setDrawer(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav>
          {menu.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setDrawer(false)}>
              <Icon size={18} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="adm-sidebar-foot">
          <a href="/" className="adm-sidebar-link"><ExternalLink size={16} /> View website</a>
          <button type="button" className="adm-sidebar-link" onClick={logout}><LogOut size={16} /> Sign out</button>
        </div>
      </aside>
      <button type="button" className="adm-scrim" onClick={() => setDrawer(false)} aria-label="Close menu" tabIndex={-1} />

      <div className="adm-main">
        <header className="adm-topbar">
          <button type="button" className="adm-icon-btn adm-menu-btn" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Menu size={19} />
          </button>
          <div className="adm-topbar-title">
            <small>Admin / {current?.label || "Dashboard"}</small>
            <strong>{current?.label || "Dashboard"}</strong>
          </div>
          <span className="adm-topbar-date">
            {now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} ·{" "}
            {now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <a href="/" className="adm-btn adm-btn-ghost adm-hide-sm"><ExternalLink size={15} /> View site</a>
          <span className="adm-avatar" title="Signed in as admin">A</span>
        </header>
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="content/new" element={<ContentEditor />} />
        <Route path="content/edit/:uid" element={<ContentEditor />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="chatbot" element={<ChatbotManager />} />
        <Route path="appearance" element={<AppearancePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
