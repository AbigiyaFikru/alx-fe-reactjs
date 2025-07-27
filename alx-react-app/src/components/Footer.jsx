const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      textAlign: 'center',
      padding: '20px',
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
      fontSize: '0.9rem',
      zIndex: '100'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <p style={{ margin: '0' }}>
          © {new Date().getFullYear()} My Favorite Cities App
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/about" style={{
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}>About</a>
          <a href="/contact" style={{
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}>Contact</a>
          <a href="/privacy" style={{
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
