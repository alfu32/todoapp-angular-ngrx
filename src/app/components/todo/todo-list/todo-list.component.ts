import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToDoListState, ToDoState } from 'src/app/store/todo/todo.state';
import * as ToDoActions from 'src/app/store/todo/todo.action';

export interface AppState {
  todos: ToDoListState;
}

@Component({

  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class ToDoListComponent implements OnInit {


  constructor(
    private store: Store<ToDoListState>
  ) { }


  todoListState$: Observable<ToDoState[]>;



  ngOnInit() {
    this.todoListState$ = this.store.select(state => state.todos);
    this.store.dispatch(new ToDoActions.GetToDos());
    console.log('ngOnInit', this.todoListState$);
    this.todoListState$.subscribe(v => console.log('this.todoListState$ has data', v));
  }

  onCreate(todo) {
    console.log(todo)
    this.store.dispatch(new ToDoActions.CreateToDo(todo));
  }

  onDelete(todo) {
    this.store.dispatch(new ToDoActions.DeleteToDo(todo));
  }

  onEdit(todo) {
    this.store.dispatch(new ToDoActions.UpdateToDo(todo));
  }

  completeToDo(todo) {
    this.store.dispatch(new ToDoActions.CompleteToDo(todo));
  }
}
