import { Response } from '@angular/http';
import { ToDoService } from './services/todo.service';
import ToDo from './models/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private todoService: ToDoService
  ) { }

  public newToDo: ToDo = new ToDo();

  title = 'app';
  todosList: ToDo[];
  editToDos: ToDo[] = [];

  ngOnInit(): void {
    // this.todoService.getToDos()
    //   .subscribe(todos => {
    //     this.todosList = todos
    //     console.log(todos)
    //   })
  }


  create() {
    this.todoService.createToDo(this.newToDo)
      .subscribe((res) => {
        this.todosList.push(res.data);
        this.newToDo = new ToDo();
      })
  }

  editToDo(todo: ToDo) {
    console.log(todo);
    if (this.todosList.includes(todo)) {
      if (!this.editToDos.includes(todo)) {
        this.editToDos.push(todo);
      } else {
        this.editToDos.splice(this.editToDos.indexOf(todo), 1)
        this.todoService.editToDo(todo).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editToDo(todo);
          console.error('Update Unsuccesful');
        })
      }
    }
  }

  doneToDo(todo: ToDo) {
    todo.status = 'Done';
    this.todoService.editToDo(todo).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editToDo(todo);
      console.error('Update Unsuccesful');
    })
  }

  submitToDo(event, todo: ToDo) {
    if (event.keyCode === 13) {
      this.editToDo(todo);
    }
  }

  deleteToDo(todo: ToDo) {
    this.todoService.deleteToDo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    });
  }

}
