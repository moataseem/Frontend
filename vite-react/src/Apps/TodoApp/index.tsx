import { ToDoItem } from "./todo-item";
import { ToDoItemType } from "./types";
import { TodoProvider, useTodoContext, useToDoDispatchContext } from "./provider";
import { useState } from "react";


function ToDoComponent() {
    const [task, setTask] = useState("");
    const state = useTodoContext();
    const dispatch = useToDoDispatchContext();

    return (

        <div>
            <div>
                <input type="text" placeholder="Add a new task" value={task} onChange={(e) => setTask(e.target.value)} />
                <button onClick={() => {
                    dispatch({ payload: { id: Math.random().toString(), task: task, completed: false }, type: 'ADD_TODO' });
                    setTask("");
                }}>Add</button>
            </div>
            {
                state?.map((item: ToDoItemType) => {
                    return <ToDoItem key={item.id} item={item} />
                })
            }
        </div>
    )
}

export function ToDoApp() {
    return (
        <TodoProvider>
            <ToDoComponent />
        </TodoProvider>
    )
}