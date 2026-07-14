import { createContext, useContext, useEffect, useState } from "react";
import PageLoader from "../components/ui/PageLoader";

const OrgDataContext = createContext(undefined);

export function OrgDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      try {
        const [settings, programs, stories, gallery, events, blogs] = await Promise.all([
          fetch(`${apiBaseUrl}/settings`).then(r => {
            if (!r.ok) throw new Error("Settings fetch failed");
            return r.json();
          }),
          fetch(`${apiBaseUrl}/programs`).then(r => {
            if (!r.ok) throw new Error("Programs fetch failed");
            return r.json();
          }),
          fetch(`${apiBaseUrl}/stories`).then(r => {
            if (!r.ok) throw new Error("Stories fetch failed");
            return r.json();
          }),
          fetch(`${apiBaseUrl}/gallery`).then(r => {
            if (!r.ok) throw new Error("Gallery fetch failed");
            return r.json();
          }),
          fetch(`${apiBaseUrl}/events`).then(r => {
            if (!r.ok) throw new Error("Events fetch failed");
            return r.json();
          }),
          fetch(`${apiBaseUrl}/blog`).then(r => {
            if (!r.ok) throw new Error("Blog fetch failed");
            return r.json();
          })
        ]);

        setData({
          orgInfo: settings.orgInfo,
          aboutContent: settings.aboutContent,
          founderMessage: settings.founderMessage,
          programs,
          stories,
          gallery,
          events,
          blogs
        });
      } catch (err) {
        setError(err.message || "Failed to load site data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Site Offline</h1>
        <p style={{ color: '#94a3b8', maxWidth: '400px' }}>
          We are undergoing scheduled database maintenance. Please reload or check back in a few moments.
        </p>
        <button onClick={() => window.location.reload()} style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#10b981',
          border: 'none',
          borderRadius: '6px',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <OrgDataContext.Provider value={data}>
      {children}
    </OrgDataContext.Provider>
  );
}

export function useOrgData() {
  const ctx = useContext(OrgDataContext);
  if (!ctx) throw new Error("useOrgData must be used within an OrgDataProvider");
  return ctx;
}
