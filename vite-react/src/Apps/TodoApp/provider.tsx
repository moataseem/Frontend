import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { ToDoItemType } from "./types";


// Define the ActionType
type ActionType =
    | { type: 'ADD_TODO'; payload: ToDoItemType }
    | { type: 'REMOVE_TODO'; payload: { id: string } }
    | { type: 'UPDATE_TODO'; payload: ToDoItemType };

// Define the todoReducer
function todoReducer(state: ToDoItemType[], action: ActionType): ToDoItemType[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'REMOVE_TODO':
            return state.filter(item => item.id !== action.payload.id);
        case 'UPDATE_TODO':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, task: action.payload.task, completed: action.payload.completed }
                    : item
            );
        default:
            return state;
    }
}

// Create the todoContext
const todoDispatchContext = createContext<React.Dispatch<ActionType>>(() => null);
const todoContext = createContext<ToDoItemType[]>([]);

// Create the TodoProvider component
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, [
        { id: "1", completed: false, task: "test" }
    ]);

    return (
        <todoContext.Provider value={state}>
            <todoDispatchContext.Provider value={dispatch}>
                {children}
            </todoDispatchContext.Provider>
        </todoContext.Provider>
    );
};

// Create the useTodoContext hook
const useTodoContext = () => {
    const context = useContext(todoContext);
    if (!context) {
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
};

const useToDoDispatchContext = () => {
    const context = useContext(todoDispatchContext);
    if (!context) {
        throw new Error("useToDoDispatchContext must be used within a TodoProvider");
    }
    return context;
}


export { TodoProvider, useTodoContext, useToDoDispatchContext };