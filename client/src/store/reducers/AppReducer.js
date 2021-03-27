import {AUTHENTICATION} from '../types';

export const appState = {
  authenticated: false,
  currentUser: null,
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return { ...state, 
        authenticated: action.payload.auth, 
        currentUser: action.payload.user,
      }
    default:
      return state
  }
}