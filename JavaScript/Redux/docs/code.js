// 2.1 Actions

// ACTION types
const ADD_TODO = 'ADD_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}

{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}

// Action Creators: function that create actions
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// How to fire a action
// initiate a dispatch
store.dispatch()
dispatch(addTodo(text))
dispatch(completeTodo(index))

// Alternatively create bound function
const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch(completeTodo(index))

boundAddTodo(text)
boundCompleteTodo(index)

// Reducer

// Reducer function must keep pure

// state
{
  VisibilityFilters: 'SHOW_ALL'
  todos: [
    {
      text: 'consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}

function todoApp(state = initialState, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      // Copy to a new object, current state and update action.filter
      return Object.assign({}, state, {
        VisibilityFilters: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        // This will make sure the new todo added to the end, later on assign function
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        // todo has a index
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}

// Has a reducer manager that returns all reducer
function todos(state = [], action) {
  swithc (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp

import { createStore } from 'redux'
import todoAPP from './reducers'
let store = createStore(todoApp)

import { addTodo, toogleTodo, setVisibilityFilter, VisibilityFilters } from './actions'

console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addTodo('Learn about actions'))

unsubscribe()   // Stop listening to state updates
