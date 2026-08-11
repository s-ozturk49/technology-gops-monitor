import React from 'react';
import { Divider } from '@takeoff-ui/react-spar';

export type SayfaTipi = "btth" | "bgvl" | "pr";

type Props = {
  children: React.ReactNode;
  userName?: string;
  aktifSayfa: SayfaTipi;
  onSelectPage: (sayfa: SayfaTipi) => void;
};

export function AppLayout({ children, userName = "Kullanıcı", aktifSayfa, onSelectPage }: Props) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* SOL MENÜ (SIDEBAR) */}
      <aside
        style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '18px', color: '#0f172a', marginBottom: '24px' }}>
          BTTH Portal
        </div>

        <Divider />

        {/* Menü Başlıkları */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <button
            onClick={() => onSelectPage("btth")}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: aktifSayfa === "btth" ? '#f1f5f9' : 'transparent',
              color: aktifSayfa === "btth" ? '#0f172a' : '#64748b',
              fontWeight: aktifSayfa === "btth" ? 600 : 400,
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Talepler (BTTH)
          </button>
          
          <button
            onClick={() => onSelectPage("bgvl")}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: aktifSayfa === "bgvl" ? '#f1f5f9' : 'transparent',
              color: aktifSayfa === "bgvl" ? '#0f172a' : '#64748b',
              fontWeight: aktifSayfa === "bgvl" ? 600 : 400,
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Zafiyetler (BGVL)
          </button>
          
          <button
            onClick={() => onSelectPage("pr")}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: aktifSayfa === "pr" ? '#f1f5f9' : 'transparent',
              color: aktifSayfa === "pr" ? '#0f172a' : '#64748b',
              fontWeight: aktifSayfa === "pr" ? 600 : 400,
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Problemler (PR)
          </button>
        </nav>
      </aside>

      {/* SAĞ TARAF */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '64px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <div style={{ fontWeight: 600, color: '#334155' }}>
            BTTH Portal
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
              {userName}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>

    </div>
  );
}