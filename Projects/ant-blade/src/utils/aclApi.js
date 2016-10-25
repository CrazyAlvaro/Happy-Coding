/*
 * Access Control List APIs
 */
import fetch from 'isomorphic-fetch';

function createUserRole(username, roleName, roleType) {
  return fetch(`/admin/user/${username}/role/${roleType}/${roleName}`, {
    method: 'PUT',
    credentials: 'same-origin',
  })
  .then(res => res);
}

function loadAllUser() {
  return fetch('/admin/user', {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then(res => res.json());
}

function deleteUserRole(username, roleName, roleType) {
  return fetch(`/admin/user/${username}/role/${roleType}/${roleName}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
  .then(res => res);
}

function loadUserRole(username) {
  return fetch(`/admin/user/${username}/role`, {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then(res => res.json());
}

function createRole(roleName, roleType) {
  return fetch(`/admin/role/${roleType}/${roleName}`, {
    method: 'PUT',
    credentials: 'same-origin',
  })
  .then(res => res);
}

function loadRoles() {
  return fetch('/admin/role', {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then(res => res.json());
}

function deleteRole(roleName, roleType) {
  return fetch(`/admin/role/${roleType}/${roleName}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
  .then(res => {
    if (res.status >= 400) {
      throw new Error('Bad Request from client');
    }
    return res;
  });
}

function loadRolesWithType(type) {
  return fetch(`/admin/role/${type}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then(res => res.json());
}

function createRoleRelation(parent, parentType, child, childType) {
  const url = `/admin/role/${parentType}/${parent}/child/${childType}/${child}`;
  return fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
  })
  .then(res => {
    if (res.status >= 400) {
      throw new Error('Bad Request from client');
    }
    return res;
  });
}

/**
 *  loadRoleRelation
 *  return all role relationships
 */
function loadRoleRelations() {
  return {
    error: 'API NOT IMPLEMENTED',
  };
}

function deleteRoleRelation(parent, parentType, child, childType) {
  const url = `/admin/role/${parentType}/${parent}/child/${childType}/${child}`;
  return fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
  .then(res => res);
}

export {
  createUserRole,
  loadAllUser,
  deleteUserRole,
  loadUserRole,
  createRole,
  loadRoles,
  deleteRole,
  createRoleRelation,
  loadRoleRelations,
  loadRolesWithType,
  deleteRoleRelation,
};
