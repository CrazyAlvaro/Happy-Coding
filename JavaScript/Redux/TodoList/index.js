import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

// Create a Redux store that holds the complete state of your App// 
let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App></App>
  </Provider>
  document.getElementById('root')
)
