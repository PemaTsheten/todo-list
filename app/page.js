'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isInputVisible, setInputVisible] = useState(false); // New state for input visibility

  const getTodoList = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setList(data.reverse());
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const postTodoList = async () => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: newTask,
          createdAt: new Date().toISOString(),
          isCompleted: false
        })
      });
      if (response.ok) {
        console.log('New Task Added');
        const newTaskData = await response.json();
        getTodoList();
        setList([newTaskData[0], ...list]);
        setNewTask("");
        setInputVisible(false); // Hide input field after adding task
      } else {
        console.error('Error adding new task');
      }
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted: true })
      });
      if (response.ok) {
        console.log('Task marked as completed');
        getTodoList();
      } else {
        console.error('Error marking task as completed');
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        console.log('Task Deleted');
        getTodoList();
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  // Function to handle button click for adding task or showing input
  const handleButtonClick = () => {
    if (isInputVisible) {
      postTodoList();
    } else {
      setInputVisible(true);
    }
  };
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100', 'bg-purple-100'];
  return (
    <main className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md">
    
        <div className="flex items-center bg-pink-300 border rounded-lg text-white p-2 mb-4 max-w-md w-full">
          <h1 className="font-bold font-style: italic">.whats your plan today?</h1>
        </div>
  
        <div className="text-center bg-white border rounded-lg text-black p-4 mb-4"
      style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {list.map((todo, index) => (
        <div 
          key={todo.id} 
          className={`mb-2 border-2 flex items-center justify-between p-2 rounded-md shadow-sm ${colors[index % colors.length]}`}
        >
          <div className="flex items-center">
            <span className="mr-2 font-bold">{index + 1}.</span> 
            {todo.is_completed ? <h1 className="text-gray-500"><s>{todo.description}</s></h1> : <h1>{todo.description}</h1>}
          </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer hover:text-green-500"
                  onClick={() => markAsCompleted(todo.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer hover:text-red-500"
                  onClick={() => deleteTask(todo.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {isInputVisible && (
          <div className="w-full mb-4">
            <input
              className="border rounded-lg p-2 w-full text-black"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
        )}

        <button
          className={`mt-4 ${isInputVisible ? 'bg-green-500' : 'bg-pink-300'} text-white rounded-lg p-2 w-full hover:bg-pink-600`}
          onClick={handleButtonClick}
        >
          {isInputVisible ? '+ Add Task' : 'Add Task'}
        </button>
      </div>
    </main>
  );
}