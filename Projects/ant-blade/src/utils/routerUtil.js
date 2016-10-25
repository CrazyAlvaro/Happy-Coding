/* eslint-disable */
export function authTransition(nextState, replace, callback) {
  console.log(nextState);
}
/* eslint-enable */

// const authTransition = function authTransition(nextState, replace, callback) {
//   const state = store.getState()
//   const user = state.user
//
//   // todo: in react-router 2.0, you can pass a single object to replace :)
//   if (!user.isAuthenticated) {
//     replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
//   }
//
//   callback()
// }
