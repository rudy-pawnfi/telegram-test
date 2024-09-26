import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  spinner: {
    border: '8px solid rgba(255, 255, 255, 0.3)',
    borderTop: '8px solid #DC19FF',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
};

export default LoadingSpinner;
