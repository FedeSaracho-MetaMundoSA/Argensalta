import {StrictMode, Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Elegantly filter out transitive browser-specific WebGL/Three.js deprecation noise
const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
  if (
    msg.includes('THREE.Clock') ||
    msg.includes('PCFSoftShadowMap') ||
    msg.includes('THREE.WebGLShadowMap') ||
    msg.includes('X4122') ||
    msg.includes('double precision') ||
    msg.includes('WebGLProgram') ||
    msg.includes('THREE.WebGLProgram')
  ) {
    return; // Safely silence driver/rendering warnings
  }
  originalWarn(...args);
};

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', color: '#900', fontFamily: 'monospace' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
