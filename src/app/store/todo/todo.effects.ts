import { ToDoState } from './todo.state';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as ToDoActions from './todo.action';

import { HttpClient } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';

const environment = {
    production: false,
    client: {
        base_url: 'http://localhost:3000'
    }
};

@Injectable()
export class ToDoEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }

    @Effect()
    GetToDos$: Observable<Action> = this.actions$
    .pipe(
        ofType<ToDoActions.GetToDos>(ToDoActions.GET_TODOS),
        mergeMap( action =>
            this.http.get(environment.client.base_url + '/api/todos')
                .pipe(
                    map((data: Response) => {
                        console.log('GetToDos$', data);
                        return new ToDoActions.GetToDosSuccess(data['data']['docs'] as ToDoState[]);
                    }),
                    catchError(() => of(new ToDoActions.GetToDoError())),
                )
        ),
    );

    @Effect()
    createToDo$: Observable<Action> = this.actions$
    .pipe(
        ofType<ToDoActions.CreateToDo>(ToDoActions.CREATE_TODO),
        mergeMap(action =>
            this.http.post(environment.client.base_url + '/api/todos', action.payload)
                .pipe(
                    map((data: Response) => {
                        console.log('createToDo$', data);
                        return new ToDoActions.CreateToDoSuccess({
                            ...data['data'], loading: false
                        });
                    }),
                    catchError(() => of(new ToDoActions.CreateToDoError()))
            )
        )
    );

    @Effect()
    deleteToDo$: Observable<Action> = this.actions$
    .pipe(
        ofType<ToDoActions.DeleteToDo>(ToDoActions.DELETE_TODO),
        mergeMap(action =>
            this.http.delete(environment.client.base_url + '/api/todos/' + action.payload._id)
            .pipe(
                map((data: Response) => {
                    console.log('deleteToDo$', data);
                    return new ToDoActions.DeleteToDoSuccess({
                        ...action.payload, loading: false
                    });
                }),
                catchError(() => of(new ToDoActions.DeleteToDoError(action.payload)))
            )
        ),
    );

    @Effect()
    updateToDo$: Observable<Action> = this.actions$
    .pipe(
        ofType<ToDoActions.UpdateToDo>(ToDoActions.UPDATE_TODO),
        mergeMap(action =>
            this.http.put(environment.client.base_url + '/api/todos/', action.payload)
            .pipe(
                map((data: Response) => {
                    console.log('updateToDo$', data);
                    return new ToDoActions.UpdateToDoSuccess({
                        ...action.payload, loading: false, editing: false
                    });
                }),
                catchError(() => of(new ToDoActions.DeleteToDoError(action.payload))),
            )
        ),
    );

}
