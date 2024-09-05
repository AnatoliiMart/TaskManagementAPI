import React, { useEffect, useState } from 'react';
import { List, Button, Modal, message } from 'antd';
import TaskForm from '../components/TaskForm';
import { getTasks, deleteTask } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsModalVisible(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteTask(id, token);
      message.success('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleAddTask} style={{ marginBottom: '20px' }}>
        Add Task
      </Button>
      <List
        loading={loading}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEditTask(task)}>Edit</Button>,
              <Button danger onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={task.description}
            />
            <div>Status: {task.status}</div>
          </List.Item>
        )}
      />
      <Modal
        title={currentTask ? 'Edit Task' : 'Add Task'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TaskForm
          initialValues={currentTask}
          fetchTasks={fetchTasks}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
