import React, { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(todo.id)}
        className={`rounded-full p-1 ${
          todo.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300 hover:border-green-500'
        }`}
      >
        <Check size={16} className={todo.completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} />
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditText(todo.text);
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : ''}`}>
            {todo.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}