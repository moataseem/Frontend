import { useState } from 'react';
import { useToDoDispatchContext } from './provider';
import { ToDoItemType } from './types'; // Adjust the import path as necessary

export function ToDoItem({ item }: Readonly<{ item: ToDoItemType }>) {
    const dispatch = useToDoDispatchContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(item.task);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch({ type: 'UPDATE_TODO', payload: { id: item.id, task: editedTask, completed: item.completed } });
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
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: { id: item.id } })}>
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