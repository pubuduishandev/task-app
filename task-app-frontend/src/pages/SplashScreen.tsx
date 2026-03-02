import React, { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Animated gradient background */}
      <div style={styles.gradientBg}></div>
      
      {/* Decorative floating orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      {/* Content wrapper */}
      <div style={styles.contentWrapper}>
        {/* Logo with pulse animation */}
        <div style={{
          ...styles.logoContainer,
          animation: isAnimating ? 'pulse 2s ease-in-out infinite' : 'none',
        }}>
          <img 
            src="/app-logo.png" 
            alt="App Logo" 
            style={styles.logo}
            onError={(e) => {
              e.target.style.backgroundColor = '#fff';
              e.target.style.borderRadius = '16px';
            }}
          />
        </div>

        {/* Title with fade-in animation */}
        <div style={{
          ...styles.titleWrapper,
          animation: 'fadeInUp 0.8s ease-out 0.2s both',
        }}>
          <h1 style={styles.title}>NestTask</h1>
          <p style={styles.subtitle}>Stay organized, stay focused</p>
        </div>

        {/* Loading indicator */}
        {isAnimating && (
          <div style={{
            ...styles.loaderWrapper,
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
          }}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading</p>
          </div>
        )}
      </div>

      {/* CSS animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.25;
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(-40px, 30px) scale(0.9);
            opacity: 0.2;
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.12;
          }
          50% {
            transform: translate(20px, 50px) scale(1.05);
            opacity: 0.22;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: '#0f172a',
  },

  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #1a4d8f 50%, #0f3460 75%, #16213e 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 8s ease infinite',
    zIndex: 0,
  },

  // Floating orb decorations
  orb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(100, 200, 255, 0.3), transparent)',
    filter: 'blur(40px)',
    top: '10%',
    right: '10%',
    animation: 'float1 6s ease-in-out infinite',
    zIndex: 0,
  },

  orb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(147, 112, 219, 0.25), transparent)',
    filter: 'blur(40px)',
    bottom: '15%',
    left: '5%',
    animation: 'float2 7s ease-in-out infinite',
    zIndex: 0,
  },

  orb3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), transparent)',
    filter: 'blur(40px)',
    bottom: '20%',
    right: '5%',
    animation: 'float3 8s ease-in-out infinite',
    zIndex: 0,
  },

  contentWrapper: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    textAlign: 'center',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '24px',
    padding: 12,
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: '16px',
    objectFit: 'contain',
  },

  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 56,
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.5px',
    textShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  },

  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    letterSpacing: '0.3px',
  },

  loaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },

  spinner: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.15)',
    borderTopColor: 'rgba(255, 255, 255, 1)',
    animation: 'spin 1.2s linear infinite',
    boxShadow: '0 0 20px rgba(100, 200, 255, 0.3)',
  },

  loadingText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
};