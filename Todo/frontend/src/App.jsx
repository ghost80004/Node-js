import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const API = "http://localhost:5000";

  const getTodos = async () => {
    const res = await axios.get(`${API}/get`);
    setTodos(res.data.allTodo);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post(`${API}/add`, { todo: task });
    setTask("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    getTodos();
  };

  const startEdit = (id, todo) => {
    setEditId(id);
    setEditTask(todo);
  };

  const updateTodo = async () => {
    await axios.put(`${API}/update/${editId}`, { todo: editTask });
    setEditId(null);
    setEditTask("");
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="title">Todo Application</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Write your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input"
          />
          <button onClick={addTodo} className="btn add">Add</button>
        </div>

        <ul className="list">
          {todos.map((item) => (
            <li key={item._id} className="list-item">
              {editId === item._id ? (
                <input
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span className="task-text">{item.todo}</span>
              )}

              <div className="actions">
                {editId === item._id ? (
                  <button onClick={updateTodo} className="btn save">Save</button>
                ) : (
                  <button
                    onClick={() => startEdit(item._id, item.todo)}
                    className="btn edit"
                  >Edit</button>
                )}

                <button
                  onClick={() => deleteTodo(item._id)}
                  className="btn delete"
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


