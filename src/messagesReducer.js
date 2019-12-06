import {
  FETCH_MESSAGES,
  ADD_MESSAGE,
  SAVE_MESSAGE,
  DELETE_MESSAGE,
} from './messagesActions';

var shortid = require ('shortid'); 

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
      return {
        ...state,
        messages: action.payload,
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
    case ADD_MESSAGE: {
      console.log('messagesReducer: action.type=', action.type);
      let _messages = state.messages.slice();
      _messages.push(
        {
          id: shortid.generate(),
          text: '',
          isPublic: false
        }
      )
      return {
        ...state,
        messages: _messages
      };
    }
    default:
      return state;
  }
};

export default messagesReducer;