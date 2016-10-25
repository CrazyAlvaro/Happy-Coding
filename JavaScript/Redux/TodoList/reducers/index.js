import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// Combine all reducer functions to be used by redux
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
