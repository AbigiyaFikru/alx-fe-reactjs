const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '1px solid gray', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: 'blue',
        marginTop: '0',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px'
      }}>{props.name}</h2>
      <p style={{
        margin: '8px 0',
        color: '#333'
      }}>Age: <span style={{ 
        fontWeight: 'bold',
        color: '#0066cc'
      }}>{props.age}</span></p>
      <p style={{
        margin: '8px 0',
        color: '#555',
        lineHeight: '1.4'
      }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
