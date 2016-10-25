import fetch from 'isomorphic-fetch';

function loadProfile() {
  return fetch('/auth/me', {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then(res => res.json());
}

export {
  loadProfile,
};
