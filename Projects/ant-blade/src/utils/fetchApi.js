import fetch from 'isomorphic-fetch';

export function readMetaApi({ tableId }) {
  return fetch(`/api/${tableId}`, {
    method: 'OPTIONS',
  }).then(res => res.json());
}

export function readTableApi({ tableId, query }) {
  const api = query ? `/api/${tableId}${query}` : `/api/${tableId}`;
  return fetch(api, {
    method: 'GET',
  }).then(res => res.json());
}

export function readCSVTableApi(tableId, query) {
  return fetch(`/api/${tableId}${query}`, {
    method: 'GET',
    headers: {
      Accept: 'text/csv',
    },
  }).then(res => res.text());
}

export function readPartOfTableData(tableId, query, startRow, endRow) {
  const api = `/api/${tableId}${query}`;
  return fetch(api, {
    method: 'GET',
    headers: {
      'Range-Unit': 'items',
      Range: `${startRow}-${endRow}`,
    },
  }).then(res => res.json());
}

export function updateApi(tableId, datumId, datum) {
  fetch(`/api/${tableId}?id=eq.${datumId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(datum),
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('update failed');
    }
  });
}

export function deleteApi(tableId, datumId) {
  fetch(`/api/${tableId}?id=eq.${datumId}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.status !== 204) {
      throw new Error('delete failed');
    }
  });
}

export function createApi(tableId, datum) {
  return fetch(`/api/${tableId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(datum),
  }).then(res => {
    if (res.status !== 201) {
      throw new Error('create failed');
    }
  });
}
