import { useEffect, useState } from 'react';
import { Layout, Typography, List, Checkbox, Input, Button, Card, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TaskService } from './services/task.service';
import type { Task } from './types/task.types';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // --- SERVICE CALLS ---

  const loadTasks = async () => {
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      message.error('Failed to load tasks from backend');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []); // Runs once on mount

  const handleCreate = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await TaskService.createTask({ title: newTaskTitle });
      setNewTaskTitle('');
      loadTasks();
      message.success('Task created successfully');
    } catch (error) {
      message.error('Failed to create task');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await TaskService.updateTask(id, { isCompleted: !currentStatus });
      loadTasks();
    } catch (error) {
      message.error('Failed to update task status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      loadTasks();
      message.success('Task deleted');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingTask || !editTitle.trim()) return;
    try {
      await TaskService.updateTask(editingTask.id, { title: editTitle });
      setIsEditModalOpen(false);
      loadTasks();
      message.success('Task updated');
    } catch (error) {
      message.error('Failed to save changes');
    }
  };

  // --- UI RENDERING ---

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header style={{ backgroundColor: '#1890ff', display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Enterprise Task Manager</Title>
      </Header>
      
      <Content style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input 
              placeholder="What needs to be done?" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onPressEnter={handleCreate}
            />
            <Button type="primary" onClick={handleCreate}>Add Task</Button>
          </div>
        </Card>

        <Card title="Your Tasks">
          <List
            dataSource={tasks}
            locale={{ emptyText: 'No tasks found. Create one to get started!' }}
            renderItem={(task) => (
              <List.Item
                actions={[
                  <Button type="text" icon={<EditOutlined />} onClick={() => {
                    setEditingTask(task);
                    setEditTitle(task.title);
                    setIsEditModalOpen(true);
                  }} />,
                  <Button danger type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(task.id)} />
                ]}
              >
                <Checkbox 
                  checked={task.isCompleted} 
                  onChange={() => handleToggleStatus(task.id, task.isCompleted)}
                  style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', fontSize: '16px' }}
                >
                  {task.title}
                </Checkbox>
              </List.Item>
            )}
          />
        </Card>

        <Modal 
          title="Edit Task" 
          open={isEditModalOpen} 
          onOk={handleSaveEdit} 
          onCancel={() => setIsEditModalOpen(false)}
        >
          <Input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            onPressEnter={handleSaveEdit}
          />
        </Modal>

      </Content>
    </Layout>
  );
}