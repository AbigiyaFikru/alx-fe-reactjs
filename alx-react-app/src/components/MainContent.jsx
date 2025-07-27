const MainContent = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f7fa',
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <UserProfile 
        name="John Doe" 
        age={28} 
        bio="Loves traveling and photography. Has visited over 30 countries and enjoys capturing beautiful moments."
      />
      <UserProfile 
        name="Jane Smith" 
        age={34} 
        bio="Enjoys hiking and reading science fiction. Favorite hiking spot is the Pacific Crest Trail."
      />
      <UserProfile 
        name="Alex Johnson" 
        age={25} 
        bio="Urban explorer and food blogger. Always looking for hidden gems in the city."
      />
    </div>
  );
};

export default MainContent;
