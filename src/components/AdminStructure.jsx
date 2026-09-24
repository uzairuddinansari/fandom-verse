import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import gsap from "gsap";
import "../styles/AdminStructure.css";

function DashboardOrb() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.x = state.clock.elapsedTime * 0.25;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.2}>
      <Sphere ref={mesh} args={[1, 64, 64]} scale={1.25}>
        <MeshDistortMaterial color="#7c3aed" roughness={0.15} metalness={0.8} distort={0.35} speed={2} />
      </Sphere>
    </Float>
  );
}

const AdminStructure = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    gsap.fromTo(sidebarRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" });

    gsap.fromTo(navRef.current, { y: -25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: "power3.out" });

    gsap.fromTo(contentRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: "power3.out" });
  }, []);

  const handleLogout = () => {
    gsap.to(".admin", {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      onComplete: () => {
        localStorage.removeItem("adminAccess");
        localStorage.removeItem("user");
        navigate("/admin");
      }
    });
  };

  const menuItems = [
    { path: "/admin/dashboard/add-products", icon: "＋", label: "Add Products" },
    { path: "/admin/dashboard/live-visitors", icon: "◉", label: "Live Visitors" },
    { path: "/admin/dashboard/analytics", icon: "📊", label: "Analytics" },
    { path: "/admin/dashboard/performance", icon: "📈", label: "Performance" },
    { path: "/admin/dashboard/AppearanceCustomizer", icon: "A", label: "Appearance" }
  ];

  return (
    <div className="admin">
      <aside ref={sidebarRef} className={open ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-logo">
          <div className="logo-orb">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[2, 2, 3]} intensity={3} />
              <DashboardOrb />
            </Canvas>
          </div>

          {open && (
            <div className="logo-text">
              <h2>Admin</h2>
              <span>CONTROL CENTER</span>
            </div>
          )}
        </div>

        <div className="menu-title">{open && "MAIN MENU"}</div>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? "active" : ""}>
              <span className="menu-icon">{item.icon}</span>
              {open && <span>{item.label}</span>}
              {open && <span className="menu-arrow">›</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {open && (
            <div className="sidebar-status">
              <span className="status-dot"></span>

              <div>
                <strong>System Online</strong>
                <small>Everything is running</small>
              </div>
            </div>
          )}

          <button className="sidebar-collapse" onClick={() => setOpen(!open)}>
            <span>{open ? "‹" : "›"}</span>
            {open && "Collapse Sidebar"}
          </button>
        </div>
      </aside>

      <div className={open ? "admin-main open" : "admin-main"}>
        <header ref={navRef} className="admin-nav">
          <div className="nav-left">
            <button className="sidebar-btn" onClick={() => setOpen(!open)}>☰</button>

            <div className="page-heading">
              <span>ADMINISTRATION</span>
              <h3>Dashboard</h3>
            </div>
          </div>

          <div className="nav-right">
            <button className="notification-btn">
              🔔
              <span></span>
            </button>

            <div className="nav-divider"></div>

            <div className="admin-user">
              <div className="user-circle">{user ? user.charAt(0).toUpperCase() : "U"}</div>

              <div className="user-info">
                <strong>{user || "User"}</strong>
                <small>Administrator</small>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <span>↪</span>
              Logout
            </button>
          </div>
        </header>

        <main ref={contentRef} className="admin-content">
          <div className="content-glow"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminStructure;
