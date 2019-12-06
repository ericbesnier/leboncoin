import { MESSAGES_API } from './messagesApi'
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SAVE_MESSAGE = 'SAVE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export function fetchMessages() {
  console.log('messagesActions/fetchMessages');
  return {
    type: 'FETCH_MESSAGES',
    payload: MESSAGES_API.fetchMessages()
  }
}

export function addMessage() {
  console.log('messagesActions/addMessage');
  return {
    type: 'ADD_MESSAGE',
  }
}

export function saveMessage(message) {
  console.log('messagesActions/saveMessage: message=', message);

  return {
    type: 'SAVE_MESSAGE',
    payload: MESSAGES_API.saveMessage(message)
  }
}

export function deleteMessage(id) {
  console.log('messagesActions/deleteMessage: id=', id);
  return {
    type: 'DELETE_MESSAGE',
    payload: MESSAGES_API.deleteMessage(id)
  }
}



