import { ToastContainer, toast } from '../../../src';

function App() {
  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => toast('Test', { autoClose: 30000 })}>Show Toast</button>

      <div style={{ height: '120vh' }} />

      <input placeholder="Tap to open keyboard" style={{ padding: 10, fontSize: 16 }} />
      <div style={{ height: '120vh' }} />
      <ToastContainer position="top-right" />
    </div>
  );
}

export { App };
