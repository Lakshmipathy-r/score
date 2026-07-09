import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";

const isFirebaseConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

const container = document.getElementById("root");
const root = createRoot(container);

if (!isFirebaseConfigured) {
  root.render(
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#FF003C',
      fontFamily: 'monospace',
      padding: '40px',
      display: 'flex',
      flexDirection: 'col',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      border: '2px solid #FF003C',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '600px', padding: '20px', border: '1px dashed #FF003C' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', textTransform: 'uppercase', tracking: '0.1em' }}>
          ⚠️ Environment Variables Missing
        </h1>
        <p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          The application is failing to load because Firebase environment variables are not configured.
        </p>
        <div style={{ textAlign: 'left', backgroundColor: '#111', padding: '15px', color: '#888', fontSize: '12px', border: '1px solid #333' }}>
          <strong>Required Vercel Environment Variables:</strong>
          <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0 0 0' }}>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_API_KEY</span></li>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_AUTH_DOMAIN</span></li>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_PROJECT_ID</span></li>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_STORAGE_BUCKET</span></li>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_MESSAGING_SENDER_ID</span></li>
            <li>• <span style={{ color: '#CCFF00' }}>VITE_FIREBASE_APP_ID</span></li>
          </ul>
        </div>
        <p style={{ color: '#888', fontSize: '11px', marginTop: '20px' }}>
          Configure these variables in your Vercel Dashboard under Project Settings &gt; Environment Variables, then redeploy.
        </p>
      </div>
    </div>
  );
} else {
  root.render(
    <GlobalErrorBoundary>
        <App />
    </GlobalErrorBoundary>
  );
}

