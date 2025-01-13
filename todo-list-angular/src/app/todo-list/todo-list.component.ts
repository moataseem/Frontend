import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})

export class TodoListComponent {
  todoList: TodoItem[] = [];
  newTask: string = '';

  constructor() { }

  ngOnInit() {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList);
    }
  }

  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  addTask(text: string): void {
    if (text?.trim()) {
      const newTodoItem: TodoItem = {
        id: Date.now().toString(),
        task: text.trim(),
        completed: false
      }
      this.todoList.push(newTodoItem);
      this.newTask = '';
      this.saveTodoList();
    }
  }

  deleteTask(id: string): void {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: string): void {
    const todoItem = this.todoList.find(todo => todo.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }

}

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}