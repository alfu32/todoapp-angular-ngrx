import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo;

  @Output() created = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() edited = new EventEmitter();
  @Output() completed = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('TodoListItemComponent::ngOnInit', this.todo);
  }
  createTodo(todo) {
    console.log(todo)
    this.created.emit(todo);
  }


  editTodo(todo) {
    this.todo.editing = !this.todo.editing;
  }

  completeTodo(todo) {
    this.completed.emit(todo);
  }


  editTodoSubmit(todo) {
    this.edited.emit(todo);
  }
}
