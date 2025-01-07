import { ToDoItem } from "./todo-item";
import { ToDoItemType } from "./types";
import { TodoProvider, useTodoContext } from "./provider";
import { useState } from "react";

function ToDoComponent() {
    const [task, setTask] = useState("");
    const { todos, addTodo } = useTodoContext();

    return (

        <div>
            <div>
                <input type="text" placeholder="Add a new task" value={task} onChange={(e) => setTask(e.target.value)} />
                <button onClick={() => {
                    addTodo({ id: Math.random().toString(), task: task, completed: false });
                    setTask("");
                }}>Add</button>
            </div>
            {
                todos?.map((item: ToDoItemType) => {
                    return <ToDoItem key={item.id} item={item} />
                })
            }
        </div>
    )
}

export function ToDoAppWithZustand() {
    return (
        <TodoProvider>
            <ToDoComponent />
        </TodoProvider>
    )
}