import ToDo from '../../models/todo.model';

export interface ToDoState extends ToDo {
    loading: boolean;

    editable: boolean;
    edited: boolean;
    editing: boolean;

    selected: boolean;
    refreshing: boolean;

    create: boolean;

    error: boolean;
}

export function initializeToDoState() {
    return {
        loading: false,

        editable: true,
        edited: false,
        editing: false,

        selected: false,
        refreshing: false,

        create: true,

        error: false,
    };
};

export interface ToDoListState {
    todos: ToDoState[];
    loading: boolean;
    pending: number;
}

export const intializeToDoListState = () => {
    return {
        loading: false,
        pending: 0,
    };
};