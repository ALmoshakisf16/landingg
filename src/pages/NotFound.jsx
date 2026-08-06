export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: '#94a3b8',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>404</h1>
        <p style={{ fontSize: '18px', marginTop: '12px' }}>الصفحة غير موجودة</p>
      </div>
    </div>
  );
}
