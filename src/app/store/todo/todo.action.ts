import { ToDoState } from './todo.state';
import ToDo from '../../models/todo.model';

import { Action } from '@ngrx/store';

export const CREATE_TODO = '[ToDo] CREATE_TODO';
export const CREATE_TODO_SUCCESS = '[ToDo] CREATE_TODO_SUCCESS';
export const CREATE_TODO_ERROR = '[ToDo] CREATE_TODO_ERROR';

export const GET_TODO = '[ToDo] GET_TODO';
export const GET_TODO_SUCCESS = '[ToDo] GET_TODO_SUCCESS';
export const GET_TODO_ERROR = '[ToDo] GET_TODO_ERROR';

export const UPDATE_TODO = '[ToDo] UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = '[ToDo] UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_ERROR = '[ToDo] UPDATE_TODO_ERROR';

export const GET_TODOS = '[ToDo] GET_TODOS';
export const GET_TODOS_SUCCESS = '[ToDo] GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = '[ToDo] GET_TODOS_ERROR';

export const DELETE_TODO = '[ToDo] DELETE_TODO';
export const DELETE_TODO_SUCCESS = '[ToDo] DELETE_TODO_SUCCESS';
export const DELETE_TODO_ERROR = '[ToDo] DELETE_TODO_ERROR';

export const COMPLETE_TODO = 'COMPLETE_TODO';
// Actions for Getting  ToDos
export class GetToDos implements Action {
    readonly type = GET_TODOS;
}

export class GetToDosSuccess implements Action {
    readonly type = GET_TODOS_SUCCESS;

    constructor(public payload: ToDoState[]) { }

}
export class GetToDosError implements Action {
    readonly type = GET_TODOS_ERROR;
}
// Action for Creating TOdos
export class CreateToDo implements Action {
    readonly type = CREATE_TODO;

    constructor(public payload: ToDo) { }
}
export class CreateToDoSuccess implements Action {
    readonly type = CREATE_TODO_SUCCESS;

    constructor(public payload: ToDoState) { }
}
export class CreateToDoError implements Action {
    readonly type = CREATE_TODO_ERROR;
}
export class GetToDo implements Action {
    readonly type = GET_TODO;

    constructor(payload: string) { }
}

export class GetToDoSuccess implements Action {
    readonly type = GET_TODO_SUCCESS;

    constructor(public payload: ToDo) { }

}

export class GetToDoError implements Action {
    readonly type = GET_TODO_ERROR;
}

export class UpdateToDo implements Action {
    readonly type = UPDATE_TODO;

    constructor(public payload: ToDoState) { }

}

export class UpdateToDoSuccess implements Action {
    readonly type = UPDATE_TODO_SUCCESS;

    constructor(public payload: ToDoState) {
        console.log(this.payload);
    }

}

export class UpdateToDoError implements Action {
    readonly type = UPDATE_TODO_ERROR;

    constructor(public payload: ToDoState) { }

}

export class DeleteToDo implements Action {
    readonly type = DELETE_TODO;

    constructor(public payload: ToDoState) { }
}
export class DeleteToDoSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;

    constructor(public payload: ToDoState) { }
}
export class DeleteToDoError implements Action {
    readonly type = DELETE_TODO_ERROR;

    constructor(public payload: ToDoState) { }
}

export class CompleteToDo implements Action {
    readonly type = COMPLETE_TODO;

    constructor(public payload: ToDoState) { }

}

export type All = GetToDo | GetToDoSuccess | GetToDoError |
    UpdateToDo | UpdateToDoSuccess | UpdateToDoError |
    GetToDos | GetToDosSuccess | GetToDosError |
    CreateToDo | CreateToDoSuccess | CreateToDoError |
    DeleteToDo | DeleteToDoSuccess | DeleteToDoError |
    CompleteToDo;
