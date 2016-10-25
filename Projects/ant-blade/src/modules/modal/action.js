export const OPEN_MODAL = 'app/modal/OPEN_MODAL';
export const CLOSE_MODAL = 'app/modal/CLOSE_MODAL';
export const CHANGE_MODAL_DATA = 'app/modal/CHANGE_MODAL_DATA';
export const SAVE_MODAL_FAIL = 'app/modal/saveModalFail';

export function openModal(id) {
  return {
    type: OPEN_MODAL,
    id,
  };
}

export function closeModal({ id, save }) {
  return {
    type: CLOSE_MODAL,
    id,
    save,
  };
}

export function changeModalData(path, data) {
  return {
    type: CHANGE_MODAL_DATA,
    path,
    data,
  };
}

export function saveModalFail(error) {
  return {
    type: SAVE_MODAL_FAIL,
    error,
  };
}
