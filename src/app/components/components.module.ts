import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListItemComponent } from './todo/todo-list-item/todo-list-item.component';
import { ToDoListComponent } from './todo/todo-list/todo-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [TodoListItemComponent, ToDoListComponent],
  exports: [TodoListItemComponent, ToDoListComponent]
})
export class ComponentsModule { }
