import React, { useState, useRef } from 'react';

interface LoginPageProps {
  onLogin: (values: any) => void;
  loading: boolean;
  onSwitchToRegister: () => void;
}

export default function LoginPage({ 
  onLogin, 
  loading, 
  onSwitchToRegister 
}: LoginPageProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onLogin(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container} ref={containerRef}>
      {/* Animated gradient background */}
      <div style={styles.gradientBg}></div>
      
      {/* Decorative elements */}
      <div style={styles.decorativeOrb1}></div>
      <div style={styles.decorativeOrb2}></div>
      <div style={styles.decorativeLine}></div>

      {/* Left side - Branding */}
      <div style={styles.leftSection}>
        <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
          <img 
            src="/app-logo.png" 
            alt="Logo" 
            style={styles.appLogo}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              }}
          />
          <h1 style={styles.brandTitle}>NestTask</h1>
          <p style={styles.brandSubtitle}>Stay organized, stay focused</p>
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>Seamless collaboration</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>Real-time updates</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>Intuitive workflow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div style={styles.rightSection}>
        <div style={styles.formContainer} >
          <div style={{ animation: 'slideInRight 0.8s ease-out' }}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Welcome back</h2>
              <p style={styles.formSubtitle}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email field */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'email' ? styles.inputFocused : {}),
                    ...(errors.email ? styles.inputError : {}),
                  }}
                  disabled={isSubmitting || loading}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>

              {/* Password field */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'password' ? styles.inputFocused : {}),
                    ...(errors.password ? styles.inputError : {}),
                  }}
                  disabled={isSubmitting || loading}
                />
                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting || loading ? styles.submitButtonLoading : {}),
                }}
              >
                <span style={{ opacity: isSubmitting || loading ? 0 : 1, transition: 'opacity 0.3s' }}>
                  {loading ? 'Authenticating...' : 'Sign in'}
                </span>
                {(isSubmitting || loading) && (
                  <span style={styles.spinner}></span>
                )}
              </button>
            </form>

            {/* Register link */}
            <div style={styles.registerPrompt}>
              <span>Don't have an account? </span>
              <button
                onClick={onSwitchToRegister}
                style={styles.registerLink}
              >
                Create one
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Sora:wght@300;400;500;600&display=swap');

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: '#0f172a',
    overflow: 'hidden',
    fontFamily: "'Sora', sans-serif",
  },

  gradientBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #1a2951 0%, #162a4a 25%, #1f3a5f 50%, #243a6b 75%, #1a2a4a 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 10s ease infinite',
    zIndex: 0,
  },

  decorativeOrb1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15), transparent)',
    filter: 'blur(60px)',
    top: '-100px',
    right: '-100px',
    zIndex: 1,
  },

  decorativeOrb2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1), transparent)',
    filter: 'blur(60px)',
    bottom: '50px',
    left: '-50px',
    zIndex: 1,
  },

  decorativeLine: {
    position: 'absolute',
    width: '1px',
    height: '60%',
    background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent)',
    left: '50%',
    top: '20%',
    zIndex: 2,
  },

  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    zIndex: 10,
    position: 'relative',
  },

  appLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    objectFit: 'contain',
  } as React.CSSProperties,

  brandTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '64px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 16px 0',
    letterSpacing: '-1px',
    textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  brandSubtitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '20px',
    fontWeight: 300,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 48px 0',
    letterSpacing: '0.5px',
  },

  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: 500,
  },

  featureIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: 600,
    flexShrink: 0,
  },

  rightSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    zIndex: 10,
    position: 'relative',
  },

  formContainer: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '48px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },

  formHeader: {
    marginBottom: '40px',
  },

  formTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '32px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },

  formSubtitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '24px',
  },

  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.8)',
    display: 'block',
  },

  input: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px',
    padding: '12px 16px',
    border: '1.5px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    color: '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  inputFocused: {
    borderColor: 'rgba(59, 130, 246, 0.5)',
    background: 'rgba(59, 130, 246, 0.05)',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  } as React.CSSProperties,

  inputError: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
    background: 'rgba(239, 68, 68, 0.05)',
  } as React.CSSProperties,

  errorText: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
  } as React.CSSProperties,

  submitButton: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    padding: '12px 24px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '8px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44px',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
  } as React.CSSProperties,

  submitButtonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  } as React.CSSProperties,

  spinner: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    animation: 'spin 1s linear infinite',
  } as React.CSSProperties,

  registerPrompt: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: "'Sora', sans-serif",
  } as React.CSSProperties,

  registerLink: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#3b82f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
    transition: 'all 0.2s',
    marginLeft: '4px',
  } as React.CSSProperties,
};