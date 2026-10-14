import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks');
    const data = await response.json();
    setTasks(data);
  }

  const addTask = async (task: string) => {
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: task }),
    });
    const newTask = await response.json();
    console.log('response', response);
    console.log(newTask);
    if (response.status === 201) {
      setTasks(prevTasks => [...prevTasks, newTask]);
      setShowModal(false);
    }
  }

  const deleteTask = async (taskId: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  }

  const markTaskAsDone = async (taskId: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'PATCH',
    });

    const updatedTask = await response.json();

    if (response.status === 200) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h3 className="text-3xl font-bold underline">
        To-do List
        <button 
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </h3>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ul className="list-disc pl-6">
          {
            tasks.filter(task => !task.done).map((task) => (
              <li key={task.id}>
                {task.title}
                <button 
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-green-600"
                  onClick={() => markTaskAsDone(task.id)}
                >
                  Done
                </button>
                <button 
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))
          }
        </ul>
        <h4 className="text-2xl font-bold mb-4">Done</h4>
        <ul className="list-disc pl-6">
          {
            tasks.filter(task => task.done).map((task) => (
              <li key={task.id}>
                {task.title}
                <button 
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      {showModal && 
        <Modal 
          title="Add Task"
          placeholder="Task name" 
          closeModal={() => setShowModal(false)} 
          submit={addTask} 
        />
      }
    </>
  )
};

export default App;
