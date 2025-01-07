import React, { createContext, ReactNode, useContext, useState } from "react";
import { create } from "zustand";

// Define the ToDoItemType
type ToDoItemType = {
    id: string;
    task: string;
    completed: boolean;
};

type TodoState = {
    todos: ToDoItemType[];
};

type TodoActions = {
    addTodo: (todo: ToDoItemType) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, task: string, completed: boolean) => void;
};

type TodoStore = TodoState & TodoActions;

// Create the Zustand store
const createTodoStore = () => create<TodoStore>((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (id) => set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) })),
    updateTodo: (id, task, completed) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, task, completed } : todo
        )
    }))
}));
// Define the state and action types

// Create the context
const TodoContext = createContext<ReturnType<typeof createTodoStore> | null>(null);

// Create the TodoProvider component
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state] = useState(() => createTodoStore());

    return (
        <TodoContext.Provider value={state}>
            {children}
        </TodoContext.Provider>
    );
};

export function useTodoContext(): TodoStore;
export function useTodoContext<U>(selector: (state: TodoStore) => U): U;
export function useTodoContext<U>(selector?: (state: TodoStore) => U): U | TodoStore {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('Missing state');
    }


    if (!selector) {
        return context();
    }

    return context(selector);
}

export { TodoProvider };