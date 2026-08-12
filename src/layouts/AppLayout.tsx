import { Outlet, NavLink } from "react-router-dom";
import { Button, Divider } from "@takeoff-ui/react-spar";

export function AppLayout() {
  const navItems = [
    { to: "/talepler", label: "Talepler (BTTH)" },
    { to: "/zafiyetler", label: "Zafiyetler (BGVL)" },
    { to: "/problemler", label: "Problemler (PR)" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <aside style={{ width: '240px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '24px' }}>BTTH Portal</div>
        <Divider />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "primary" : "neutral"}
                  appearance={isActive ? "filled" : "text"}
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          BTTH Portal
        </header>
        <main style={{ flex: 1, padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}