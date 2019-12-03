import { MESSAGES_API } from './messagesApi'
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_CURRENT_TEXT = 'SET_CURRENT_TEXT';
export const SET_CURRENT_IS_PUBLIC = 'SET_CURRENT_IS_PUBLIC';
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

export function setCurrentText(id, currentText) {
  console.log('messagesActions/setCurrentText: id=', id, ' currentText=', currentText);
  return {
    type: 'SET_CURRENT_TEXT',
    payload: {id:id, currentText:currentText}
  }
}

export function setCurrentIsPublic(id, currentIsPublic) {
  console.log('messagesActions/setCurrentIsPublic: id=', id, ' currentIsPublic=', currentIsPublic);
  return {
    type: 'SET_CURRENT_IS_PUBLIC',
    payload: {id:id, currentIsPublic:currentIsPublic}
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



