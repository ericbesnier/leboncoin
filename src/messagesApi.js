// import { clear } from "sisteransi";
// localStorage.clear()

const INITIAL_MESSAGES = [
  { id: 1, text: 'message 1', isPublic: true },
  { id: 2, text: 'message 2', isPublic: false },
  { id: 3, text: 'message 3', isPublic: true },
  { id: 4, text: 'message 4', isPublic: true },
]

if (localStorage.getItem('messages') === null) {
  localStorage.setItem('messages', JSON.stringify(INITIAL_MESSAGES));
}

class messagesApi {
  fetchMessages = async () => {
    console.log('messagesApi/fetchMessages');
    return await JSON.parse(localStorage.getItem("messages"));
  }

  saveMessage = async (message) => {
    console.log('messagesApi/saveMessage: message=', message);
    let messagesStorage = JSON.parse(localStorage.getItem('messages'));
    let index = messagesStorage.findIndex(msg => msg.id === message.id)
    console.log('messagesApi/saveMessage: index=', index);

    if(index === -1){ // save new message
      messagesStorage.push({
        id: message.id,
        text: message.currentText,
        isPublic: message.currentIsPublic,
      })
    }  else { // update message
      messagesStorage[index] = {
        id: message.id,
        text: message.currentText,
        isPublic: message.currentIsPublic,
      };
    }

    localStorage.setItem('messages', JSON.stringify(messagesStorage));
    return {
      id: message.id,
      text: message.currentText,
      isPublic: message.currentIsPublic,
      currentText: message.currentText,
      currentIsPublic: message.currentIsPublic,
      isEdit: false
    };
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