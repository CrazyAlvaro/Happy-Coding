// 5, Counter Reducer Function(Pure Function)
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// 7.Implement Store from Scratch
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    // notify all listeners
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    // return a function that unsubscribe this listener
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); //initial state

  return { getState, dispatch, subscribe };
}

// 6. Store Methods
const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
})

// 8
