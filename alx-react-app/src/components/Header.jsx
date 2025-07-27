function Header() {
  return (
    <header style={{ 
      backgroundColor: 'navy', 
      color: 'white', 
      textAlign: 'center',
      padding: '20px',
      marginBottom: '20px'
    }}>
      <h1 style={{
        margin: 0,
        fontSize: '2rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>My Favorite Cities</h1>
    </header>
  );
}

export default Header;
