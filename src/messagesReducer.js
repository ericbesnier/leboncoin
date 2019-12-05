import {
  FETCH_MESSAGES,
  ADD_MESSAGE,
  SET_CURRENT_TEXT,
  SET_CURRENT_IS_PUBLIC,
  SAVE_MESSAGE,
  DELETE_MESSAGE,
} from './messagesActions';

// const INITIAL_STATE = {
//   messages: [{
//     id: -1,
//     text: '',
//     isPublic: null,
//     currentText: '',
//     currentIsPublic: null,
//   }],
//   isFulfilled: null,
//   isRejected: null,
//   error: null
// };

const messagesReducer = (state, action) => {
  console.log('messagesReducer: state=', state);

  switch (action.type) {
    case `${FETCH_MESSAGES}_PENDING`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        isFulfilled: false,
        isRejected: false,
        error: null
      };
    case `${FETCH_MESSAGES}_FULFILLED`: 
      console.log('messagesReducer: action.type=', action.type);
      console.log('messagesReducer: action.payload=', action.payload);
      // init currentText & currentIsPublic with data messages
      let messagesList = action.payload;
      console.log('messagesReducer: action.payload=', action.payload);
      let messages = [];
      messagesList.forEach((msg) => {
        messages.push({
          id: msg.id,
          text: msg.text,
          isPublic: msg.isPublic,
          currentText: msg.text,
          currentIsPublic: msg.isPublic,
          isEdit: false
        })
      })
      return {
        ...state,
        messages: messages,
        isFulfilled: true,
        isRejected: false,
        error: null
      }
    case `${FETCH_MESSAGES}_REJECTED`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        isFulfilled: false,
        isRejected: true,
        error: action.payload
      };
    case `${SAVE_MESSAGE}_PENDING`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        isFulfilled: false,
        isRejected: false,
        error: null
      };
    case `${SAVE_MESSAGE}_FULFILLED`: {
      console.log('messagesReducer: action.type=', action.type);
      let message = action.payload;
      let index = state.messages.findIndex(msg => msg.id === message.id);
      let messages = state.messages.slice();
      messages[index] = message;
      return {
        ...state,
        messages: messages,
        isFulfilled: true,
        isRejected: false,
        error: null
      };
    }
    case `${SAVE_MESSAGE}_REJECTED`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        isFulfilled: false,
        isRejected: true,
        error: action.payload
      };
    case `${DELETE_MESSAGE}_PENDING`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        isFulfilled: false,
        isRejected: false,
        error: null
      };
    case `${DELETE_MESSAGE}_FULFILLED`: {
      console.log('messagesReducer: action.type=', action.type);
      console.log('messagesReducer: action.payload=', action.payload);
      let messages = state.messages.slice();
      return {
        ...state,
        messages: messages.filter(msg => msg.id !== action.payload),
        isFulfilled: true,
        isRejected: true,
        error: null
      };
    }
    case `${DELETE_MESSAGE}_REJECTED`:
      console.log('messagesReducer: action.type=', action.type);
      return {
        ...state,
        messages: action.payload,
        isFulfilled: false,
        isRejected: true,
        error: null
      };
    case SET_CURRENT_TEXT: {
      console.log('messagesReducer: action.type=', action.type, ' action.payload=', action.payload);
      let id = action.payload.id;
      let currentText = action.payload.currentText;
      let messages = state.messages.map((msg) => {
        if (msg.id === id) {
          msg.currentText = currentText;
          msg.isEdit = true
          return msg;
        }
        return msg;
      })
      return {
        ...state,
        messages: messages
      };
    }
    case SET_CURRENT_IS_PUBLIC: {
      console.log('messagesReducer: action.type=', action.type, ' action.payload=', action.payload);
      let _id = action.payload.id;
      let currentIsPublic = action.payload.currentIsPublic;
      let messages = state.messages.map((msg) => {
        if (msg.id === _id) {
          msg.currentIsPublic = currentIsPublic;
          msg.isEdit = true
          return msg;
        }
        return msg;
      })
      return {
        ...state,
        messages: messages
      };
    }
    case ADD_MESSAGE: {
      console.log('messagesReducer: action.type=', action.type);
      let messages = state.messages.slice();
      messages.push(
        {
          id: state.messages.length + 1,
          text: '',
          isPublic: false,
          currentText: '',
          currentIsPublic: false,
          isEdit: true
        }
      )
      return {
        ...state,
        messages: messages
      };
    }
    default:
      return state;
  }
};

export default messagesReducer;