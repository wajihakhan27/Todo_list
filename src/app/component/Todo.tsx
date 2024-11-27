"use client";

import { useState } from "react";
import Typewriter from "typewriter-effect";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), task: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const saveEdit = (id: number) => {
    if (editValue.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editValue } : todo
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
      }}
    >
      <header
        style={{
          backgroundColor: "#1e1e2f",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            color: "#4CAF50",
            marginBottom: "0.8rem",
          }}
        >
          Todo List
        </h1>

        <div style={{color: "#4CAF50", marginBottom: "0.8rem",}}>
        <Typewriter
          options={{
            strings: [
              "An intuitive task management tool designed to help you prioritize and complete your daily goals",
            ],
            autoStart: true,
            loop: true,
          }}
        />

        </div>
      
       
      </header>

      <main
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            backgroundColor: "#2c2c3e",
            borderRadius: "12px",
            border: "4px solid #4CAF50",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Input and Add Button */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: "12px",
                  border: "2px solid #4CAF50",
                  borderRadius: "8px",
                  backgroundColor: "#1e1e2f",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
                placeholder="Add a new task..."
              />
              <button
                onClick={addTodo}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {["all", "completed", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as "all" | "completed" | "pending")}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: filter === f ? "#4CAF50" : "#3b3b50",
                  color: filter === f ? "white" : "#b3b3b3",
                  transition: "0.3s",
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 15px",
                  border: "2px solid #3b3b50",
                  borderRadius: "8px",
                  backgroundColor: todo.completed ? "#4CAF50" : "#3b3b50",
                  color: todo.completed ? "#ffffff" : "#b3b3b3",
                  textDecoration: todo.completed ? "line-through" : "none",
                  marginBottom: "10px",
                  alignItems: "center",
                  transition: "0.3s",
                }}
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{
                      flexGrow: 1,
                      padding: "5px",
                      border: "2px solid #4CAF50",
                      borderRadius: "4px",
                      backgroundColor: "#1e1e2f",
                      color: "#ffffff",
                    }}
                  />
                ) : (
                  <span>{todo.task}</span>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {editingId === todo.id ? (
                    <button
                      onClick={() => saveEdit(todo.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        startEditing(todo.id, todo.task)
                      }
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "rosybrown",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        color: "#ffffff",
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "violet",
                      color: "white",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "rosybrown",
                      color: "white",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
