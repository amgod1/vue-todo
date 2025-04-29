import { REQUEST_STATUSES } from '@/constants/requestStatuses'
export const TOAST_TYPES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
  TODO_ADD: 'TODO_ADD',
  TODO_UPDATE: 'TODO_UPDATE',
  TODO_DELETE: 'TODO_DELETE',
}

export const toastMessages = {
  [TOAST_TYPES.SIGN_IN]: {
    [REQUEST_STATUSES.ERROR]: 'Failed to sign in.',
    [REQUEST_STATUSES.SUCCESS]: 'Signed in successfully!',
  },
  [TOAST_TYPES.SIGN_UP]: {
    [REQUEST_STATUSES.SUCCESS]: 'Account created!',
    [REQUEST_STATUSES.ERROR]: 'Failed to sign up.',
  },
  [TOAST_TYPES.SIGN_OUT]: {
    [REQUEST_STATUSES.SUCCESS]: 'Signed out!',
    [REQUEST_STATUSES.ERROR]: 'Failed to sign out.',
  },
  [TOAST_TYPES.TODO_ADD]: {
    [REQUEST_STATUSES.SUCCESS]: 'Todo added!',
    [REQUEST_STATUSES.ERROR]: 'Failed to add todo.',
  },
  [TOAST_TYPES.TODO_UPDATE]: {
    [REQUEST_STATUSES.SUCCESS]: 'Todo updated!',
    [REQUEST_STATUSES.ERROR]: 'Failed to update todo.',
  },
  [TOAST_TYPES.TODO_DELETE]: {
    [REQUEST_STATUSES.SUCCESS]: 'Todo removed!',
    [REQUEST_STATUSES.ERROR]: 'Failed to remove todo.',
  },
}
