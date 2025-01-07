import { useState } from 'react';
import { ToDoItemType } from './types'; // Adjust the import path as necessary
import { useTodoContext } from './provider';

export function ToDoItem({ item }: Readonly<{ item: ToDoItemType }>) {
    const { updateTodo, removeTodo } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(item.task);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTodo(item.id, editedTask, item.completed);
        setIsEditing(false);
    };

    return (
        <div>
            <input type="checkbox" checked={item.completed} />
            {isEditing ? (
                <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                />
            ) : (
                <span>{item.task}</span>
            )}
            <button onClick={() => removeTodo(item.id)}>
                Delete
            </button>
            {isEditing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
}