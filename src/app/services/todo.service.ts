import ToDo from '../models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ToDoService {

    apiUrl = 'http://localhost:3000';
    todoUrl = `${this.apiUrl}/api/todos`;

    constructor(
        private http: HttpClient
    ) { }


    // Create todo, takes a ToDo Object
    createToDo(todo: ToDo): Observable<any> {
        // returns the observable of http post request
        return this.http.post(`${this.todoUrl}`, todo);
    }

    // Read todo, takes no arguments
    getToDos(): Observable<ToDo[]> {
        return this.http.get(this.todoUrl)
            .pipe(
                map(res => {
                // Maps the response object sent from the server

                return res[ 'data' ].docs as ToDo[];
            }));
    }
    // Update todo, takes a ToDo Object as parameter
    editToDo(todo: ToDo) {
        const editUrl = `${this.todoUrl}`;
        // returns the observable of http put request
        return this.http.put(editUrl, todo);
    }

    deleteToDo(id: string): any {
        // Delete the object by the id
        const deleteUrl = `${this.todoUrl}/${id}`;
        return this.http.delete(deleteUrl).pipe(
            map(res => {
                return res;
            }));
    }

    // Default Error handling method.
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
