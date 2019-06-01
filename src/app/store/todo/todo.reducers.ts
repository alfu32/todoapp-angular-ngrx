import ToDo from '../../models/todo.model';
import { initializeToDoState, ToDoListState, ToDoState } from './todo.state';
import * as ToDoActions from './todo.action';

export type Action = ToDoActions.All;

const defaultToDoStates: ToDoState[] = [
    {
        ...ToDo.generateMockToDo(),
        ...initializeToDoState()
    }
];


const defaultState: ToDoListState = {
    todos: defaultToDoStates,
    loading: false,
    pending: 0
};

export function ToDoReducer(state = defaultState, action: Action) {

    switch (action.type) {
        case ToDoActions.CREATE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.loading = true;
                    }

                    return t;
                })
            };
        }

        case ToDoActions.CREATE_TODO_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...state.todos.filter(t => {
                        return t._id !== 'new';
                    }), {
                        ...action.payload,
                        edited: true
                    }, {
                        ...ToDo.generateMockToDo(),
                        ...initializeToDoState()
                    }]
            };
        }
        case ToDoActions.GET_TODOS: {
            return { ...state, loaded: false, loading: true };
        }
        case ToDoActions.GET_TODOS_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...action.payload,
                    defaultToDoStates[0]
                ],
                loading: false
            };
        }
        case ToDoActions.DELETE_TODO: {
            return {
                ...state,
                ...state.todos.filter((toDoState: ToDoState) => toDoState._id !== action.payload._id) };
        }

        case ToDoActions.DELETE_TODO_SUCCESS: {
            return state;
        }

        case ToDoActions.DELETE_TODO_ERROR: {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            };
        }

        case ToDoActions.UPDATE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.loading = true;
                    }

                    return t;
                })
            };
        }

        case ToDoActions.UPDATE_TODO_SUCCESS: {
            return modifyToDoState(state, action.payload, {})
        }



        case ToDoActions.UPDATE_TODO_ERROR: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.error = true;
                    }
                    return t;
                })
            };

        }

        case ToDoActions.COMPLETE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.status = 'done';
                    }
                    return t;
                })
            };
        }

        default: {
            return state;
        }
    }
}

function modifyToDoState(state, todo: ToDoState, modifications): ToDoListState {
    return {
        ...state,
        todos: state.todos.map(t => {
            if (t._id === todo._id) {
                return { ...t, ...todo, ...modifications }
            } else {
                return t;
            }
        })
    };
}
