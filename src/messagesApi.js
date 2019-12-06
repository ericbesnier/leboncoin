// import { clear } from "sisteransi";
// localStorage.clear()
var shortid = require ('shortid'); 

const INITIAL_MESSAGES = [
  { id: shortid.generate(), text: 'message 1', isPublic: true },
  { id: shortid.generate(), text: 'message 2', isPublic: false },
  { id: shortid.generate(), text: 'message 3', isPublic: true },
  { id: shortid.generate(), text: 'message 4', isPublic: true },
]

if (localStorage.getItem('messages') === null) {
  localStorage.setItem('messages', JSON.stringify(INITIAL_MESSAGES));
}

class messagesApi {
  _fetchMessagesWithTimeout = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem("messages")));
      }, 2000);
    });
  }
  
  fetchMessages = async () =>  {
    console.log('messagesApi/fetchMessages');
    var messages = await this._fetchMessagesWithTimeout();
    return messages;
  }

  saveMessage = async (message) => {
    console.log('messagesApi/saveMessage: message=', message);
    let messagesStorage = JSON.parse(localStorage.getItem('messages'));
    let index = messagesStorage.findIndex(msg => msg.id === message.id)
    if (index === -1) { // save new message
      messagesStorage.push(message)
    } else { // update message
      messagesStorage[index] = message;
    }
    localStorage.setItem('messages', JSON.stringify(messagesStorage));
    return message;
  }

  deleteMessage = async (id) => {
    console.log('messagesApi/deleteMessage: id=', id);
    let messagesStorage = JSON.parse(localStorage.getItem('messages'));
    let messagesStorageFiltered = messagesStorage.filter(msg => msg.id !== id);
    localStorage.setItem('messages', JSON.stringify(messagesStorageFiltered));
    return id;
  }
}

export const MESSAGES_API = new messagesApi();