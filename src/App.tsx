import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      },
      ...todos
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <ListTodo className="text-blue-500" size={32} />
            Productivity Log
          </h1>
          <p className="text-gray-600 mt-2">Take control of your time and get things done.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Circle size={16} /> Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CheckCircle2 size={16} /> Completed
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <span className="mr-4">Active: {activeTodos}</span>
              <span>Completed: {completedTodos}</span>
            </div>
          </div>

          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {filter === 'all'
                  ? 'No Logs yet. Add one above!'
                  : filter === 'active'
                  ? 'No active logs'
                  : 'No completed logs'}
              </p>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;