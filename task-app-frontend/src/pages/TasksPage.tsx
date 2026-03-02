import { useState, useEffect } from 'react';
import { message } from 'antd';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import type { Task, User } from '../types/task.types';

interface TasksPageProps {
  user: User;
  setUser: (user: User | null) => void;
  setStage: (stage: 'LOGIN' | 'REGISTER' | 'TASKS' | 'SPLASH') => void;
  onLogout: () => void;
}

export default function TasksPage({ user, setUser, setStage }: TasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      message.error('Failed to load your tasks');
    }
  };

  useEffect(() => {
    if (user && user.id) {
      loadTasks();
    }

    if (isProfileModalOpen) {
      handleProfileLoad();
    }
  }, [user, isProfileModalOpen]);

  // Create New Task API Call
  const handleCreate = async () => {
    if (!newTaskTitle.trim()) return;
    setIsCreating(true);
    try {
      const { message: apiMessage } = await TaskService.createTask(newTaskTitle);
      setNewTaskTitle('');
      loadTasks();
      message.success(apiMessage);
    } catch (error: any) {
      message.error(error.message || 'Failed to add task');
    } finally {
      setIsCreating(false);
    }
  };

  // Toggle Task Status API Call
  const handleToggleStatus = async (task: Task) => {
    try {
      const { message: apiMessage } = await TaskService.updateTask(task.id, {
        isCompleted: !task.isCompleted
      });
      await loadTasks();
      message.success(apiMessage);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Update failed';
      message.error(errorMsg);
    }
  };

  // Delete Task API Call
  const handleDelete = async (id: string) => {
    setIsDeletingId(id);
    try {
      const { message: apiMessage } = await TaskService.deleteTask(id);
      loadTasks();
      message.success(apiMessage);
    } catch (error: any) {
      message.error(error.message || 'Delete failed');
    } finally {
      setIsDeletingId(null);
    }
  };

  // Edit Task API Call
  const handleSaveEdit = async () => {
    if (!editingTask) return;
    try {
      const { message: apiMessage } = await TaskService.updateTask(editingTask.id, { title: editTitle });
      setIsEditModalOpen(false);
      loadTasks();
      message.success(apiMessage);
    } catch (error: any) {
      message.error(error.message || 'Update failed');
    }
  };

  // Get User Profile API Call
  const handleProfileLoad = async () => {
  setIsProfileLoading(true);
  try {
    const data = await AuthService.getProfile();
    setProfileData(data);
  } catch (error: any) {
    message.error(error.message || 'Failed to load profile');
    setIsProfileModalOpen(false); // Close modal if fetch fails
  } finally {
    setIsProfileLoading(false);
  }
  };

  // Logout 
  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setStage('LOGIN');
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length;
  const initials = `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`.toUpperCase();

  return (
    <div style={styles.container}>
      {/* Animated gradient background */}
      <div style={styles.gradientBg}></div>

      {/* Decorative elements */}
      <div style={styles.decorativeOrb1}></div>
      <div style={styles.decorativeOrb2}></div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{ animation: 'slideInLeft 0.6s ease-out', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/app-logo.png"
              alt="Logo"
              style={styles.appLogo}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ ...styles.headerTitle, margin: 0 }}>NestTask</h1>
              <p style={{ ...styles.headerSubtitle, marginTop: '2px', margin: 0 }}>
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ ...styles.userInfo, position: 'relative' }}>
              <span style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </span>
              <div
                style={{ ...styles.avatar, cursor: 'pointer' }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                {initials}
              </div>

              {isProfileMenuOpen && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div style={styles.profileMenu}>
                    <button
                      style={styles.profileMenuItem}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      style={{ ...styles.profileMenuItem, color: '#ef4444' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          {/* Input section */}
          <div style={styles.inputSection} >
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                disabled={isCreating}
                style={styles.input}
              />
              <button
                onClick={handleCreate}
                disabled={!newTaskTitle.trim() || isCreating}
                style={{
                  ...styles.addButton,
                  ...(isCreating ? styles.addButtonLoading : {}),
                }}
              >
                <span style={{ opacity: isCreating ? 0 : 1, transition: 'opacity 0.2s' }}>
                  ＋
                </span>
                {isCreating && <span style={styles.spinner}></span>}
              </button>
            </div>
          </div>

          {/* Tasks list */}
          <div style={styles.tasksSection}>
            <div style={styles.tasksHeader}>
              <h2 style={styles.tasksTitle}>Your Tasks</h2>
              <span style={styles.taskCount}>{totalCount}</span>
            </div>

            {tasks.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyStateIcon}>🎯</p>
                <p style={styles.emptyStateText}>No tasks yet. Create one to get started!</p>
              </div>
            ) : (
              <div style={styles.tasksList}>
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    style={{
                      ...styles.taskItem,
                      animation: `slideInRight 0.4s ease-out ${index * 0.05}s backwards`,
                    }}
                  >
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleToggleStatus(task)}
                        style={styles.checkbox}
                      />
                      <span
                        style={{
                          ...styles.taskText,
                          ...(task.isCompleted ? styles.taskCompleted : {}),
                        }}
                      >
                        {task.title}
                      </span>
                    </label>

                    <div style={styles.taskActions}>
                      <button
                        onClick={() => {
                          setEditingTask(task);
                          setEditTitle(task.title);
                          setIsEditModalOpen(true);
                        }}
                        style={styles.editButton}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        disabled={isDeletingId === task.id}
                        style={{
                          ...styles.deleteButton,
                          ...(isDeletingId === task.id ? styles.deleteButtonLoading : {}),
                        }}
                        title="Delete"
                      >
                        {isDeletingId === task.id ? '⌛' : '✕'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      {isProfileModalOpen && (
      <div style={styles.modalOverlay} onClick={() => setIsProfileModalOpen(false)}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h3 style={styles.modalTitle}>Your Profile</h3>
          
          {isProfileLoading ? (
            <div style={styles.profileInfoContainer}>
              {/* Skeleton Avatar */}
              <div style={styles.skeletonCircle}></div>
              
              <div style={{ ...styles.profileDetails, width: '100%' }}>
                {/* Skeleton Name */}
                <div style={{ ...styles.skeletonLine, width: '60%', height: '20px' }}></div>
                {/* Skeleton Email */}
                <div style={{ ...styles.skeletonLine, width: '80%' }}></div>
                {/* Skeleton Date */}
                <div style={{ ...styles.skeletonLine, width: '40%', marginTop: '12px' }}></div>
              </div>
            </div>
          ) : (
            <div style={styles.profileInfoContainer}>
              <div style={styles.profileAvatarLarge}>
                {profileData?.firstName?.charAt(0)}{profileData?.lastName?.charAt(0)}
              </div>
              <div style={styles.profileDetails}>
                <p style={styles.profileName}>{profileData?.firstName} {profileData?.lastName}</p>
                <p style={styles.profileEmail}>{profileData?.email}</p>
                <p style={{ ...styles.profileEmail, fontSize: '11px', marginTop: '8px', opacity: 0.6 }}>
                  Member since: {profileData && new Date(profileData?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}

          <div style={{ ...styles.modalActions, marginTop: '24px' }}>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              style={styles.modalSaveButton}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsEditModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
              style={styles.modalInput}
            />
            <div style={styles.modalActions}>
              <button
                onClick={() => setIsEditModalOpen(false)}
                style={styles.modalCancelButton}
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} style={styles.modalSaveButton}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Sora:wght@300;400;500;600&display=swap');

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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

        @keyframes skeletonPulse {
          0% { background-color: rgba(255, 255, 255, 0.05); }
          50% { background-color: rgba(255, 255, 255, 0.12); }
          100% { background-color: rgba(255, 255, 255, 0.05); }
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
    backgroundColor: '#0f172a',
    overflow: 'hidden',
    fontFamily: "'Sora', sans-serif",
  },

  gradientBg: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, #1a2951 0%, #162a4a 25%, #1f3a5f 50%, #243a6b 75%, #1a2a4a 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 10s ease infinite',
    zIndex: 0,
  },

  decorativeOrb1: {
    position: 'fixed',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.08), transparent)',
    filter: 'blur(80px)',
    top: '-100px',
    right: '-100px',
    zIndex: 1,
    pointerEvents: 'none',
  },

  decorativeOrb2: {
    position: 'fixed',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.06), transparent)',
    filter: 'blur(80px)',
    bottom: '10%',
    left: '-50px',
    zIndex: 1,
    pointerEvents: 'none',
  },

  header: {
    position: 'relative',
    zIndex: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '24px 0',
  },

  headerContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  appLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    objectFit: 'contain',
  },

  headerTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
  },

  headerSubtitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  userName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  } as React.CSSProperties,

  logoutButton: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '20px',
    padding: '8px 12px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  } as React.CSSProperties,

  main: {
    position: 'relative',
    zIndex: 10,
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 0',
  },

  contentWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 40px',
  },

  inputSection: {
    marginBottom: '40px',
    animation: 'slideInRight 0.6s ease-out 0.1s backwards',
  } as React.CSSProperties,

  inputWrapper: {
    display: 'flex',
    gap: '12px',
  },

  input: {
    flex: 1,
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px',
    padding: '14px 18px',
    border: '1.5px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  addButton: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '20px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
    position: 'relative',
  } as React.CSSProperties,

  addButtonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  } as React.CSSProperties,

  spinner: {
    position: 'absolute',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    animation: 'spin 0.8s linear infinite',
  } as React.CSSProperties,

  tasksSection: {
    animation: 'slideInRight 0.6s ease-out 0.2s backwards',
  } as React.CSSProperties,

  tasksHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },

  tasksTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
  },

  taskCount: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(59, 130, 246, 0.8)',
    background: 'rgba(59, 130, 246, 0.1)',
    padding: '4px 10px',
    borderRadius: '6px',
  } as React.CSSProperties,

  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  } as React.CSSProperties,

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    cursor: 'pointer',
    minWidth: 0,
  } as React.CSSProperties,

  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#3b82f6',
    flexShrink: 0,
  } as React.CSSProperties,

  taskText: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.85)',
    transition: 'all 0.2s',
    wordBreak: 'break-word',
  } as React.CSSProperties,

  taskCompleted: {
    textDecoration: 'line-through',
    color: 'rgba(255, 255, 255, 0.4)',
  } as React.CSSProperties,

  taskActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },

  editButton: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '16px',
    padding: '6px 10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    background: 'rgba(59, 130, 246, 0.1)',
    color: 'rgba(59, 130, 246, 0.9)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  deleteButton: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '16px',
    padding: '6px 10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'rgba(239, 68, 68, 0.9)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  deleteButtonLoading: {
    opacity: 0.6,
    cursor: 'not-allowed',
  } as React.CSSProperties,

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },

  emptyStateIcon: {
    fontSize: '48px',
    margin: '0 0 16px 0',
  } as React.CSSProperties,

  emptyStateText: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  } as React.CSSProperties,

  // Modal styles
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,

  modal: {
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    padding: '32px',
    maxWidth: '420px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
  } as React.CSSProperties,

  modalTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 16px 0',
  } as React.CSSProperties,

  modalInput: {
    width: '100%',
    fontFamily: "'Sora', sans-serif",
    fontSize: '15px',
    padding: '12px 16px',
    border: '1.5px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    marginBottom: '20px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  } as React.CSSProperties,

  modalActions: {
    display: 'flex',
    gap: '12px',
  },

  modalCancelButton: {
    flex: 1,
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    padding: '10px 16px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  modalSaveButton: {
    flex: 1,
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    padding: '10px 16px',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  } as React.CSSProperties,

  profileMenu: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '12px',
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    padding: '8px',
    minWidth: '160px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  } as React.CSSProperties,

  profileMenuItem: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 16px',
    borderRadius: '8px',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
  } as React.CSSProperties,

  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
  } as React.CSSProperties,

  profileAvatarLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '24px',
    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
  } as React.CSSProperties,

  profileDetails: {
    textAlign: 'center',
  } as React.CSSProperties,

  profileName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 4px 0',
  } as React.CSSProperties,

  profileEmail: {
    fontFamily: "'Sora', sans-serif",
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  } as React.CSSProperties,

  skeletonCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    animation: 'skeletonPulse 1.5s infinite ease-in-out',
  },
  skeletonLine: {
    height: '14px',
    borderRadius: '4px',
    animation: 'skeletonPulse 1.5s infinite ease-in-out',
    margin: '8px auto',
  } as React.CSSProperties,
};